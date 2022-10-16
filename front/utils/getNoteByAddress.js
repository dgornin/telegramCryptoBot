import Note from "./Note";
import NoteConnector from "./NoteConnector";

const getNoteByAddress = async (address) => {
  console.log("address: ", address);
  const noteAddress = await NoteConnector.ownerToNote(address);
  if (noteAddress === "0x0000000000000000000000000000000000000000") {
    throw new Error("There is no such note");
  }
  console.log("noteAddress: ", noteAddress);
  const contract = Note(noteAddress);
  const note = await contract.note();
  console.log("note: ", note);
  return { note, noteAddress };
};

export default getNoteByAddress;
