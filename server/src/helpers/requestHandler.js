const requestHandler = (callback) => async (req, res) => {
  const path = req.path;
  console.log("Request received: ", path);

  try {
    const result = await callback(req);
    return res.status(200).json(result);
  } catch (error) {
    console.log(`Request to ${path} failed:`, error);

    return res.status(500).json({ message: error.message });
  }
};

module.exports = requestHandler;
