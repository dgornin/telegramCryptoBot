import { Form, Button, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import getNoteByAddress from "../utils/getNoteByAddress";
import { useRef, useState } from "react";
import Link from "next/link";

export default function Check() {
    const [note, setNote] = useState("");
    const [noteAddress, setNoteAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    const addressRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const address = addressRef.current.value;
        setErrorMessage("");
        setNote("");
        setNoteAddress("");
        if (!address) {
          setErrorMessage("Enter user address");
          return;
        }
        setLoading(true);
        try {
          const contract = await getNoteByAddress(address);
          setNote(contract.note);
          setNoteAddress(contract.noteAddress);
        } catch (error) {
          console.error(error);
          setErrorMessage(error.message);
        } finally{
          setLoading(false);
        }
      };

    return <Layout>
      <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Form.Field>
          <label>Enter your address</label>
          <input ref={addressRef} placeholder="0x0000000000000000000000000000000000000000" />
        </Form.Field>
        <Button loading={isLoading} primary type="submit">
          Check
        </Button>
        <Message error header="Error!" content={errorMessage} />
      </Form>
      {note && <h2>Note: {note}</h2>}
      {noteAddress && <a target="_blank" href={"https://goerli.etherscan.io/address/" + noteAddress} ><Button>Check on etherscan</Button></a>}
    </Layout>
}
