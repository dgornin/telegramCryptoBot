import getNoteByAddress from "../../utils/getNoteByAddress";


export default function adr(req, res) {
  async function get_n(address){
    try {
          const contract = await getNoteByAddress(address);
          const text = contract.note
          console.log(`!!!!!!!!!!!!!${text}`);
          await res.status(200).json({ "adr": address,
            "note": text,
            "url": `https://goerli.etherscan.io/address/${contract.noteAddress}`
          })

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message })
    }
  }

  if (req.method === 'POST') {
    const address = req.body.adr
    if (address) {
      get_n(address)
    }
    else {
      res.status(400).json({ error: "No address" })
    }
  } else {
    res.status(200).json({ error: 'Use post' })
  }
}
