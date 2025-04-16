exports.indexGet = [
  async (req, res) => {
    res.render("index", {
      title: "Index Page",
    });
  },
];
