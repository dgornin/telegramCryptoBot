import { useState, useEffect } from "react";
import { Form, Input, Button, Message, Loader } from "semantic-ui-react";
import Layout from "../components/Layout";
import provider from "../utils/provider";
import Note from "../utils/Note";
import getNoteByAddress from "../utils/getNoteByAddress";

export default function Check() {
    const [note, setNote] = useState("");
    const [newNote, setNewNote] = useState("");
    const [noteAddress, setNoteAddress] = useState("");
    const [currentAccount, setCurrentAccount] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSeccessMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(async () => {
        const { ethereum } = window;
        if (!ethereum) {
            setErrorMessage("You don't have metamask");
        }
        try {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.error(error);
          setErrorMessage("You don't have metamask");
        }
    }, []);

    useEffect(async () => {
        if (currentAccount) {
            setLoading(true);
            try {
            const contract = await getNoteByAddress(currentAccount);
            setNote(contract.note);
            setNoteAddress(contract.noteAddress);
            } catch (error) {
            console.error(error);
            setErrorMessage("You dont have note");
            } finally{
            setLoading(false);
            }
        }
    }, [currentAccount])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setSeccessMessage("");
        try {
            const signer = provider.getSigner();
            const contract = Note(noteAddress).connect(signer);
            console.log("func: ", contract.functions);
            let response = await contract.setNote(newNote);
            console.log("respose: ", response)
            setSeccessMessage("Hash " + response.hash);
        } catch (error) {
            console.error(error);
            setErrorMessage(error);
        }
    };

    return <Layout>
    {currentAccount && note && <>
    <h4>Your note is : {note}</h4>
    <h4>Located at : {noteAddress}</h4>
    <a target="_blank" href={"https://goerli.etherscan.io/address/" + noteAddress} ><Button>Check on etherscan</Button></a>
    <Form
      error={!!errorMessage}
      success={!!successMessage}
      onSubmit={handleSubmit}
      style={{ marginTop: "20px" }}
    >
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Note"
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="Some text"
        />
      </Form.Group>
      <Button primary>Change</Button>
      <Message
        style={{ wordBreak: "break-word" }}
        error
        header="Error"
        content={errorMessage}
      />
      <Message success header="Success!" content={successMessage} />
    </Form></>}
    {!currentAccount && <Message error header="Error!" content={errorMessage} />}
    {!note && <Message error header="Error!" content={errorMessage} />}
    {isLoading && <Loader active inline='centered' />}
    </Layout>
}
