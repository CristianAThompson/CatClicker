var meowdel = {
  currentCat: null,
   "cats" : [
      {"name":"Grump", "picUrl":"http://catgallery.top/wp-content/uploads/2016/04/grumpy-cat-breed-600px-grumpy-purebred-cat.jpg", "clickCount": 0},
      {"name":"Sleepy", "picUrl":"http://www.catster.com/wp-content/uploads/2015/06/600px-cat-relaxing.jpg", "clickCount": 0},
      {"name":"Stare", "picUrl":"http://i.imgur.com/73D5L.jpg", "clickCount": 0},
      {"name":"Hide", "picUrl":"http://www.catster.com/wp-content/uploads/2015/06/600px-Cat_peeking_out_from_couch.jpg", "clickCount": 0},
      {"name":"Ron", "picUrl":"http://i.imgur.com/W45iy.jpg", "clickCount": 0}
    ]
  };

var octopus = {
  init: function() {
    meowdel.currentCat = meowdel.cats[0];

    catListView.init();
    catView.init();
  },

  getCurrentCat: function() {
    return meowdel.currentCat;
  },

  getCats: function() {
    return meowdel.cats;
  },

  setCurrentCat: function(kitten) {
    meowdel.currentCat = kitten;
  },

  clickIncrease: function() {
    meowdel.currentCat.clickCount++;
    catView.render();
  }
};


var catView = {

  init: function() {
    this.catElem = document.getElementById('cat-content');
    this.catNameElem = document.getElementById('cat-name');
    this.catImgElem = document.getElementById('cat-img');
    this.catClickCount = document.getElementById('click-count');
    this.adminEnable = document.getElementById('enable-admin');
    this.adminName = document.getElementById('admin-name');
    this.adminImg = document.getElementById('admin-img');
    this.adminClicks = document.getElementById('admin-clicks');
    this.adminCancel = document.getElementById('admin-cancel');
    this.adminSubmit = document.getElementById('admin-submit');

    this.catImgElem.addEventListener('click', function(){
      octopus.clickIncrease();
    });

    this.render();
  },

  render: function() {
    var currentCat = octopus.getCurrentCat();
    this.catClickCount.textContent = currentCat.clickCount;
    this.catNameElem.textContent = currentCat.name;
    this.catImgElem.src = currentCat.picUrl;
    this.adminName.value = currentCat.name;
    this.adminImg.value = currentCat.picUrl;
    this.adminClicks.value = currentCat.clickCount;

    this.adminEnable.addEventListener('click', function() {
      $('#admin-content').toggleClass('hidden');
    });
    this.adminCancel.addEventListener('click', function() {
      $('#admin-content').addClass('hidden');
    });
    this.adminSubmit.addEventListener('click', function() {
      currentCat.name = $('#admin-name').val();
      currentCat.picUrl = $('#admin-img').val();
      currentCat.clickCount = $('#admin-clicks').val();
      $('#admin-content').addClass('hidden');
      catView.render();
    });
  }
};

var catListView = {

  init: function() {
    this.catListElem = document.getElementById('list-content');

    this.render();
  },

  render: function() {
    var kitten, elem, i;

    var cats = octopus.getCats();


    this.catListElem.innerHTML = "";

    for (i = 0; i < cats.length; i++) {
      kitten = cats[i];

      elem = document.createElement('button');
      elem.textContent = kitten.name;

      elem.addEventListener('click', function(kitten){
        return function(){
          octopus.setCurrentCat(kitten);
          catView.render();
        };
      }(kitten));

      this.catListElem.appendChild(elem);
    }
  }
};

octopus.init();
