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


Images.prototype.displayImage = function() { 
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
  $('select').change(() => { 
    const $selectedImage = $('select option:selected').text();
    if ($selectedImage === 'Filter by Keyword') {
      $('img').show();
    } else {
      $(`section[keyword!=${$selectedImage}]`).hide();
      $(`section[keyword=${$selectedImage}]`).show();
    }
  })
}

function titleSortListener() { 
  $('#title').click( () => { 
    Images.list.sort( (a,b) => a.title > b.title ? 1 : a.title < b.title ? -1 : 0);
    console.log(Images.list);
    clearAllImages();
    displayAllImages();
  })
}

function hornSortListener() { 
  $('#horn').click( () => { 
    Images.list.sort( (a,b) => a.horns > b.horns ? 1 : a.horns < b.horns ? -1 : 0);
    console.log(Images.list);
    clearAllImages();
    displayAllImages();
  })
}

function displayAllImages() { 
  const photoTemplate = $('#photo-template').html();
  const photoTemplateScript = Handlebars.compile(photoTemplate);
  Images.list.forEach(object => {
    const image = {'title': object.title, 'image_url': object.image_url, 'description': object.description, 'keyword': object.keyword};
    const html = photoTemplateScript(image);
    $('main').append(html);
  })
}

function clearAllImages() { 
  $('section').hide();
}
