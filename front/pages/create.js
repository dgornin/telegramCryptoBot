import { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import provider from "../utils/provider";
import NoteConnector from "../utils/NoteConnector";

export default function Check() {
  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSeccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSeccessMessage("");
    if(!note){
        setErrorMessage("Fill note field");
        return;
    }
    
    const signer = provider.getSigner();
    const NoteConnectorWithSigner = NoteConnector.connect(signer);
    console.log("func: ", NoteConnectorWithSigner.functions);
    try {
      let response = await NoteConnectorWithSigner.createNote(note);
      console.log("respose: ", response);
      setSeccessMessage("Hash " + response.hash);
    } catch (error) {
      console.error(error);
      setErrorMessage("You already have not, chage it from profile. Or you don't have metamsk");
    }
  };

    return <Layout>
    <Form
      error={!!errorMessage}
      success={!!successMessage}
      onSubmit={handleSubmit}
    >
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          label="Note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Some text"
        />
      </Form.Group>
      <Button primary>Сохранить</Button>
      <Message
        style={{ wordBreak: "break-word" }}
        error
        header="Error"
        content={errorMessage}
      />
      <Message success header="Success!" content={successMessage} />
    </Form>
  </Layout>
}
