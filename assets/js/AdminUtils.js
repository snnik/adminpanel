const cNames = {
    CONTENT: 'ccontent',
    PRODUCTS: 'cproducts',
    FEATURES:'cfeatures'
};

const scNames = {
    HEADER:'HEADER',
    IMAGE:'IMAGE',
    TEXT:'TEXT',
    SIDEBAR:'SIDEBAR',
    PRODUCT: 'PRODUCT'
};

const tLayots = {
  header: (function(){
    let t = new Map([['header', 'Elit sed feugiat'],
    ['paragrath', 'Lorem ipsum dolor sit amet consectetur' +
    'et sed adipiscing elit. Curabitur et vel sem sit amet dolor' +
    'neque semper magna.']]);
    return t;
  })(),
  
  text: (function(){
    let t = 'Lorem ipsum dolor sit amet consectetur' +
        'et sed adipiscing elit. Curabitur et vel sem sit amet dolor' +
        'neque semper magna. Lorem ipsum dolor sit amet consectetur et dolore' +
        'adipiscing elit. Curabitur vel sem sit.';
    return t;
  })(),

  image:(function(){
    let t = new Map([['blockHref','#'],
                    ['imgRef', 'http://s1.iconbird.com/ico/1012/QettoIcons/w256h2561350658929folderpicture2.png']]);
    return t;
  })()
};

let nspApp = {
    
    strToField:function Atr(arr, val){
             let result = new Map();
             let index = arr.length;
             let key = arr.shift();
      
              if(index-1 > 0){                
                result.set(key, Atr(arr, val));
              } else {
                result.set(key, val);
              }
             return result;
    },
  
    idCounter:(function(){
        let counter = 0;
        return function(){
            return counter++;
        };
    })(),

    arrObj:[],

    editBlock: function(h,w){
        $('.summernote').summernote({
            toolbar: [
                // [groupName, [list of button]]
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ],
            height: h,
            width: w
        });
    }
}||nspApp;

class cBase{
    constructor(id, name, type){
        this.id = id;
        this.name = name; //const
        this.type = type || 0; //1||2||3 or const for header
    }

    setContent(atr){
        for (let [key, value] of atr.entries()){
          if (Reflect.has(this, key)){
              //console.log(this[key] instanceof Object);
            if(this[key] instanceof Object){
                this[key].setContent(value);
            }else{                
                Reflect.set(this, key, value);
            }
          }
        }
    }

    content(){ //Заглушка для "перегрузки"
        return null;
    }

    getContent(){
        return this.content(true);
    }

    getPreview(){
        return this.content(1);
    }

    static promoBlock(){
        return '<!-- Promo -->\n' +
            '<div class="promo-wrapper">\n' +
            '<section class="promo"></section>\n' +
            '</div>';
    }

}

//Image class. Проверить вывод, возможно ли выводить блоком вьюху.
class сImage extends cBase{
    constructor(id, name) {
        super(id, name);
        this.imgRef = '';
        this.imgAlt = '';
        this.blockHref = '#';
        this.blockClasses = 'image featured'; // возможно надо удалить
    }

    content() {
        let content, ca, cimg;

        if(arguments[0]=== true){

            content = /*'<img src="' + this.imgRef + '" ' + this.imgAlt + ' />\n'+*/
                     '<input type="Image" class="'+this.name+'-image" data-id ="'+this.id+'" src="'+this.imgRef+'" width="200" height="200">\n';
            //'<a href = "' + this.blockHref + '" class="' + this.blockClasses + ' '+ this.name +'"><img src="' + this.imgRef + '" ' + this.imgAlt + ' /></a>';
        }else{
            content = '<a href = "' + this.blockHref + '" class="' + this.blockClasses + ' '+ this.name +'"><img src="' + this.imgRef + '" ' + this.imgAlt + ' /></a>';
        }
        
        return content;
    }
}

// Text section
class сText extends cBase{
    constructor(id, name, type) {
        super(id, name, type);        
        if (this.type === 1) {
            this.blockClass = 'col-5 col-12-mobile';
        }
        this.tContent = '';
    }

    setContent(text) {
        this.tContent = text;
    }

    content() {      
        let content = '';
            if (arguments[0] === true){
                  content = '<div class="summernote '+ this.name +'" data-id ="'+this.id+'">\n' + this.tContent + '\n</div>\n';
              } else{
              if(this.type === 1){
                  content = '<div class="'+this.blockClass+' '+ this.name +'">\n<p>\n' +this.tContent + '\n</p>\n</div>\n';
              } else{
                  content = '<p>\n' +this.tContent + '\n</p>\n';
              }              
            }             
        return content;
    }

}

/* HeaderContainer - header content check*/
class сHeader extends cBase{
    constructor(id, name, type, sdbr) {
        super(id, name, type);
        this.header = '';
        this.paragrath = '';
        this.sidebar = sdbr||false; 
    }

    content() {
      let content = '';
      if (arguments[0] === true) {
              if (this.type === 0 && !this.sidebar) {
                content = '<header>\n' +
                    '<h2>\n<input type="text" class="form-control input-lg '+this.name+'-header" data-id ="'+this.id+'" value="'+this.header+'">\n</h2>\n' +
                    '<input type="text" class="form-control input-sm '+this.name+'-paragrath" data-id ="'+this.id+'" value="'+this.paragrath+'">\n' +
                    '</header>\n';
              }
        
              if ((this.type === 0 && this.sidebar) || (this.type === 1))  {
                  content = '<header>\n' +
                      '<input type="text" class="form-control input-lg" placeholder="'+this.header+'">\n' +
                      '<input type="text" class="form-control input-sm" placeholder="'+this.paragrath+'">\n' +
                      '</header>\n';
              }       
      } else{
            if (this.type === 0 && !this.sidebar) {
                content = '<header>\n<h2>' + this.header + '</h2>\n' + this.paragrath + '\n</header>\n';
            }
            if (this.type === 0 && this.sidebar) { //!!!!
                content = '<header>\n<h3>' + this.header + '</h3>\n</header>\n';
            }
            if(this.type === 1){
                content = '<header>\n<h2>' + this.header + '</h2>\n</header>\n';
            }
      }
    return content;
  }
}

class cElement extends cBase{
  constructor(id, name, type){
    super(id, name, type);
    this.image = new сImage(this.id, this.name+'-image');
    this.text = new сText(this.id, this.name+'-text', 1);
  }
  
  content(){
    let content ='<section class="col-4 col-12-narrower feature '+this.name+'" data-id ="'+this.id+'">\n' +
                '<div class="image-wrapper">\n' +
                  this.image.getContent() +
                '</div>\n'+
                   this.text.getContent() +
                '</section>';
    return content;
  }
}

class сSidebar extends cBase{ 
    constructor(id) {
        super(id, scNames.SIDEBAR);
        this.firstHeader = new сHeader(this.id, this.name+'firstHeader', 1, true);
        this.secondHeader =  new сHeader(this.id, this.name+'secondHeader', 1, true);
        this.image = new сImage(this.id);       
    }

    content() {
        let content ='<div class="col-4 col-12-narrower">\n<section class="sidebar" data-id ="'+this.id+'" data-name = "'+this.name+'">\n<section>\n';
        content +=this.firstHeader.getContent() +'\n';        
        content +='</section>\n<section>\n';
        content +=this.image.getContent();        
        content +=this.secondHeader.getContent()+'\n';        
        content +='</section>\n</section>\n</div>\n';
        return content;
    }
}

class cUnit extends cBase{
    constructor(id, type, sidebar = false) {
        super(id, cNames.CONTENT, type);
        this.header = new сHeader(this.id, 'js-header', 0);
        this.image = new сImage(this.id, 'js-image');
        this.text = new сText(this.id, 'js-text', this.type);
        if (sidebar){
            this.sdbr = sidebar;
            this.sidebar = new сSidebar(this.id, 'js-sidebar');
        }
    }

    content() {
        let content = '<!-- Block -->\n';
        content += '<div id="' + this.id + '" class = "wrapper">\n' +
            '<div class = "container main" data-id ="'+this.id+'" data-name = "'+this.name+'">\n';
        content += (this.type === 1 && this.sdbr) ? '<div class="row gtr-150">\n' +
            this.sidebar.getContent()+'<div class="col-8 col-12-narrower">\n' : '';
        content += (this.type === 2 && this.sdbr) ? '<div class="row gtr-150">\n<div class="col-8 col-12-narrower">\n' : '';
        content +='<!-- Content -->\n'+
                    '<article class="content">\n'+
                        this.header.getContent();
        content += (this.type === 2 && !this.sdbr) ? '<div class="row">\n <div class = "col-7 col-12-mobile">\n' : '';
        content += this.image.getContent() + '\n';
        content += (this.type === 2 && !this.sdbr) ? '</div>\n' : '';
        content += this.text.getContent();
        content += (this.type === 2 && !this.sdbr) ? '<div>\n' : '';
        content +='</article>\n';
        content += (this.type === 1 && this.sdbr) ? '</div>\n</div>\n' : '';
        content += (this.type === 2 && this.sdbr) ? '</div>\n'+this.sidebar.getContent()+'</div>\n' : '';
        content +='</div>\n</div>\n<!-- End Block -->\n';

        return content;
    }
}

class сFeatures extends cBase{
    constructor(id){
        super(id, cNames.FEATURES, 1);            
        this.firstHeader = new сHeader(this.id, this.view);
        this.secondHeader = new сHeader(this.id, this.view);
        this.firstImage = new сImage(this.id);
        this.secondImage = new сImage(this.id);
        this.firstText = new сText(this.id, this.view);
        this.secondText = new сText(this.id, this.view);
    }

    content(){
        return '<!-- Features 1 -->\n' +
            '<div class="wrapper">\n' +
            '<div class="container" data-id ="'+this.id+'" data-name = "'+this.name+'">\n' +
            '<div class="row">\n' +
            '<section class="col-6 col-12-narrower feature">\n' + //12
            '<div class="image-wrapper first">\n' +
            this.firstImage.getContent() +
            '</div>\n' +
            this.firstHeader.getContent() +
            this.firstText.getContent() +
            '</section>\n<section class="col-6 col-12-narrower feature">\n' + //12
            '<div class="image-wrapper">\n' +
            this.secondImage.getContent() +
            '</div>\n' +
            this.secondHeader.getContent()+
            this.secondText.getContent()+
            '</section>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>';
    }
}

class cProduct extends cBase{
    constructor(id, type) {
        super(id, cNames.PRODUCTS, type);
        this.header = new сHeader(this.id, 1);
        this.thirst = new cElement(this.id);
        this.second = new cElement(this.id);
        this.last = new cElement(this.id);
    }

    content(){
        let res = '';
            res += '<!-- Features 2 -->\n' +
                '<div class="wrapper">\n' +
                '<section class="container" data-id ="'+this.id+'" data-name = "'+this.name+'">\n' +
                this.header.getContent() +
                '<div class="row features">\n';            
            res +=this.thirst.getContent();
            res +=this.second.getContent();
            res +=this.last.getContent();
            res +='\n</div>\n</section>\n</div>\n';

        return res;
    }

}

$(document).ready(function(){
//      $('.elem-icons').draggable();

    $('#createbuttons')[0].addEventListener('click', function(event) {

        $('.contentblock').append(function(){
            let target = event.target,
                atr = new Map(),
                blocktype;

                if (target.id ==='nosidebar'||target.id ==='leftsidebar') {
                    blocktype = 1;
                }

                if(target.id === 'nosidebarv2'||target.id ==='rightsidebar'){
                        blocktype = 2;
                }

            if (target.id === 'nosidebar' || target.id === 'nosidebarv2' ||target.id === 'rightsidebar' || target.id === 'leftsidebar') {

                if(target.id === 'nosidebar' || target.id === 'nosidebarv2'){
                    nspApp.arrObj.push(new cUnit(nspApp.idCounter(), blocktype));
                }

                if  (target.id === 'rightsidebar' || target.id === 'leftsidebar') {
                    nspApp.arrObj.push(new cUnit(nspApp.idCounter(), blocktype, true));
                                                             
                    atr.set('sidebar', new Map([['firstHeader', tLayots.header],
                                                ['secondHeader', tLayots.header],                                                                                               
                                                ['image',tLayots.image]]));
                    }

                atr.set('header', tLayots.header);
                atr.set('image', tLayots.image);
                atr.set('text', tLayots.text);

                nspApp.arrObj[nspApp.arrObj.length - 1].setContent(atr);
            }

            if (target.id === 'features'){
                nspApp.arrObj.push(new сFeatures(nspApp.idCounter()));

                atr.set('firstHeader', tLayots.header);
                atr.set('secondHeader', tLayots.header);
                atr.set('firstImage', tLayots.image);
                atr.set('secondImage', tLayots.image);
                atr.set('firstText', tLayots.text);
                atr.set('secondText', tLayots.text);                
            }
          
            if(target.id === 'productgrid'){
              nspApp.arrObj.push(new cProduct(nspApp.idCounter(), 2));
              atr.set('header', tLayots.header);
              atr.set('thirst', new Map([['text', tLayots.text], ['image', tLayots.image]]));
              atr.set('second', new Map([['text', tLayots.text], ['image', tLayots.image]]));
              atr.set('last', new Map([['text', tLayots.text], ['image', tLayots.image]]));
            }
            
            nspApp.arrObj[nspApp.arrObj.length - 1].setContent(atr);    

            return nspApp.arrObj[nspApp.arrObj.length - 1].getContent();
        });
       nspApp.editBlock();
    });
    
    $('.contentblock')[0].addEventListener('focusout',function(event){
      let cname, atr;
      let elem = $(event.target);
      let ctname = elem.attr('class').split(' ');
      let tid = elem.attr('data-id');
      let val =elem.prop('value');      
      //анализ класса
      for(let i=0; i<ctname.length; i++){
        if (~ctname[i].indexOf('js-')){
         cname = ctname[i].split('-');
         cname.splice(0,1);           
        }
      }
      //console.log();
       for(let i = 0; i<nspApp.arrObj.length; i++){
         if(nspApp.arrObj[i].id === parseInt(tid)){           
           //index = appNames.arrObj[i].id;
           atr = nspApp.strToField(cname, val);
           nspApp.arrObj[i].setContent(atr);
           console.log(nspApp.arrObj[i]);
         }
       }      
      
      // val должно содержать: input - текст, summernote - текст, image - кодированный файл для пересылки и дальнейшего востановления на сервере.
    });


    /*   $('#features').click(function () {
            $('.contentblock').append(function () {
                appNames.arrObj.push(new appClasses.features(appNames.idCounter()));
                return appNames.arrObj[appNames.arrObj.length-1].getContent();
            });
            appNames.editBlock();
        });

        $('#productwithtext').click(function () {
            $('.contentblock').append(function () {
                appNames.arrObj.push(new appClasses.products(appNames.idCounter(), 1));
                return appNames.arrObj[appNames.arrObj.length-1].getContent();
            });
            appNames.editBlock();
        });*/

});