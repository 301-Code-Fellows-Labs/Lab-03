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

$.get('./data/page-1.json', (data) => {
  data.forEach(element => {
    new Images(element.image_url, element.title, element. description, element.keyword, element.horns);
  })
  optionListener();
});


Images.prototype.displayImage = function() { 
  const $newImage = $('#photo-template').clone();

  $newImage.find('h2').text(this.title).attr('keyword', `${this.keyword}`);
  $newImage.find('p').text(this.description).attr('keyword', `${this.keyword}`);
  $newImage.find('img').attr({ src: this.image_url, 
    alt: this.keyword});

  $('main').append($newImage);
  if (counter === 0) {
    $('#photo-template:first-child').remove();
  }
  counter++;
  };

Images.prototype.displayOptions = function() { 
  if (!optionArray.includes(this.keyword)) {
    $('select').append(`<option>${this.keyword}</option>`);
    optionArray.push(this.keyword);
  }
}

function optionListener() { 
  $('select').change( () => { 
    const $selectedImage = $('select option:selected').text();
    console.log($selectedImage);
    
    $('img').not(`[alt="${$selectedImage}"]`).hide();
    $('h2').not(`[alt="${$selectedImage}"]`).hide();
    $('p').not(`[alt="${$selectedImage}"]`).hide();
    $(`img[alt="${$selectedImage}"]`).show();
    $(`h2[keyword="${$selectedImage}"]`).show();
    $(`p[keyword="${$selectedImage}"]`).show();

  })
}