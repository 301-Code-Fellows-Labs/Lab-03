'use strict';

function Images(url, title, description, keyword, horns) { 
  this.image_url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  Images.list.push(this);
  this.displayImage();
  this.displayOptions();
}

Images.list = [];
const optionArray = [];
let counter =0;


Images.prototype.displayImage = function() { 
  // const $newImage = $('#photo-template').clone();

  // $newImage.find('h2').text(this.title).attr('keyword', `${this.keyword}`);
  // $newImage.find('p').text(this.description).attr('keyword', `${this.keyword}`);
  // $newImage.find('img').attr({ src: this.image_url, 
  //   alt: this.keyword});

  // $('main').append($newImage);
  // if (counter === 0) {
  //   $('#photo-template:first-child').remove();
  // }
  // counter++;

  console.log(typeof this.title);
  const photoTemplate = $('#photo-template').html();
  const photoTemplateScript = Handlebars.compile(photoTemplate);
  const image = {'title': this.title, 'image_url': this.image_url, 'description': this.description, 'keyword': this.keyword};
  const html = photoTemplateScript(image);
  $('main').append(html);

};

Images.prototype.displayOptions = function() { 
  if (!optionArray.includes(this.keyword)) {

    optionArray.push(this.keyword);
    const optionTemplate = $('#option-template').html();
    const optionTemplateScript = Handlebars.compile(optionTemplate);
    const option = {'keyword': this.keyword};
    const html = optionTemplateScript(option);
    $('select').append(html);

  }
}

function optionListener() { 
  $('select').change( () => { 
    const $selectedImage = $('select option:selected').text();
    if ($selectedImage === 'Filter by Keyword') {
      $('img').show();
    } else {
      $('img').not(`[alt="${$selectedImage}"]`).hide();
      $('h2').not(`[alt="${$selectedImage}"]`).hide();
      $('p').not(`[alt="${$selectedImage}"]`).hide();
      $(`img[alt="${$selectedImage}"]`).show();
      $(`h2[keyword="${$selectedImage}"]`).show();
      $(`p[keyword="${$selectedImage}"]`).show();
    }
  })
}
