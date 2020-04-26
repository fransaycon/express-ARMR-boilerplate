const receiveStuff = (req, res) => {
    res.json({ secret: `You have accessed a public route.` });
  };
  
  export default receiveStuff;
  