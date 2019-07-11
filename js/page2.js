$.get('./data/page-2.json', (data) => {
  data.forEach(element => {
    new Images(element.image_url, element.title, element. description, element.keyword, element.horns);
  })
  optionListener();
  titleSortListener();
  hornSortListener();
});