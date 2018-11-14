// Image Section
const MBLOCK= 'MAIN',
      SBRBLOCK = 'SIDEBAR',
      FEATURES = 'FEATURES';

var appClasses = {

    promoBlock: function () {
        return '<!-- Promo -->\n' +
            '<div class="promo-wrapper">\n' +
            '<section class="promo"></section>\n' +
            '</div>'
    },

    imageBlock: class ImageContainer {
        constructor(id) {
            this.id = id;
            this.imgRef = '';
            this.imgAlt = '';
            this.blockHref = '';
            this.blockClasses = 'image featured';
        }

        setContent(atr) {
            for (let pair of atr.entries()){
                this[pair[0]] = pair[1]||this[pair[0]];
            }
        }

        getContent() {
            return '<a href = "' + this.blockHref + '" class="' + this.blockClasses + '"><img src="' + this.imgRef + '" ' + this.imgAlt + ' /></a>';
        }
    },

// Text section
    textBlock: class TextContainer {
        constructor(id, blockType) {
            this.id = id;
            if (blockType === 1) {
                this.blockClass = 'summernote';
            }
            if (blockType === 2) {
                this.blockClass = 'summernote col-5 col-12-mobile';
            }
            this.tContent = '';
        }

        setContent(t) {
            this.tContent = t;
        }

        getContent() {
            return '<div class = "' + this.blockClass + '">\n' +
                '<p>' + this.tContent + '</p>\n' +
                '</div>\n';
        }

    },

//header content
    header: class HeaderContainer {
        constructor(id, btype) {
            this.id = id;
            this.typeContent = btype;
            this.headerText = '';
            this.paragrathText = '';
        }

        setContent(atr){
            for (let pair of atr.entries()){
                this[pair[0]] = pair[1]||this[pair[0]];
            }
        }

        getContent() {
            if (this.typeContent === MBLOCK) {
                return '<header>\n' +
                    '<h2>' + this.headerText + '</h2>\n' +
                    '<p>' + this.paragrathText + '</p>\n' +
                    '</header>\n';
            }
            if (this.typeContent === SBRBLOCK) {
                return '<header>\n' +
                    '<h3>' + this.headerText + '</h3>\n' +
                    '</header>\n';
            }
            if(){

            }
        }
    },

    sidebar: class sidebarContainer {
        constructor(id) {
            this.id = id;
            this.header1 = '';
            this.header2 = '';
            this.paragrath1 = '';
            this.paragrath2 = '';
            this.imgHref = '';
            this.imgSrc = '';
        }

        setContent(atr){
            for (let pair of atr.entries()){
                this[pair[0]] = pair[1]||this[pair[0]];
            }
        }


        getContent() {

            var res ='<div class="col-4 col-12-narrower">\n<section class="sidebar">\n<section>\n';
            res +='<header>\n<h3>'+this.header1 +'</h3>\n</header>\n';
            res +='<p>'+this.paragrath1+'</p>\n';
            res +='</section>\n<section>\n';
            res +='<a href="'+ this.imgHref+'" class="image featured"><img src="'+this.imgSrc+'" alt="" /></a>\n';
            res +='<header>\n';
            res +='<h3>'+this.header2+'</h3>\n</header>\n';
            res +='<p>'+this.paragrath2+'</p>\n';
            res +='</section>\n</section>\n</div>\n';
            return res;
        }
    },

    block: class BlockContainer {
        constructor(id, tb, t) {
            this.id = id;
            this.containerType = tb; //MAIN||SECTION
            this.typeBlock = t; // 0||1||3
            this.header = new appClasses.header(this.id, this.containerType);
            this.imageBlock = new appClasses.imageBlock(id);
            this.textBlock = new appClasses.textBlock(id, this.typeBlock);
            if (this.containerType === SBRBLOCK){this.sidebar = new appClasses.header(this.id);}

        }

        setContent(atr){
            for (let pair of atr.entries()){
                this[pair[0]].setContent(pair[1]);
            }
        }

        getContent() {
            let res = '<!-- Block -->\n';
            res += '<div id="' + this.id + '" class = "wrapper">\n' +
                '<div class = "container main">\n';
            res += (this.typeBlock === 1 && this.containerType === SBRBLOCK) ? '<div class="row gtr-150">\n' +
                this.sidebar.getContent()+'<div class="col-8 col-12-narrower">\n' : '';
            res += (this.typeBlock === 2 && this.containerType === SBRBLOCK) ? '<div class="row gtr-150">\n<div class="col-8 col-12-narrower">\n' : '';
            res +='<!-- Content -->\n'+
                        '<article class="content">\n'+
                            this.header.getContent();
            res += (this.typeBlock === 2 && this.containerType === MBLOCK) ? '<div class="row">\n <div class = "col-7 col-12-mobile">\n' : '';
            res += this.imageBlock.getContent() + '\n';
            res += (this.typeBlock === 2 && this.containerType === MBLOCK) ? '</div>\n' : '';
            res += this.textBlock.getContent();
            res += (this.typeBlock === 2 && this.containerType === MBLOCK) ? '<div>\n' : '';
            res +='</article>\n';
            res += (this.typeBlock === 1 && this.containerType === SBRBLOCK) ? '</div>\n</div>\n' : '';
            res += (this.typeBlock === 2 && this.containerType === SBRBLOCK) ? '</div>\n'+this.sidebar.getContent()+'</div>\n' : '';
            res +='</div>\n</div>\n' +appClasses.promoBlock()+'<!-- End Block -->\n';

            return res;
        }
    },

    features:class Features{
        constructor(id){
            this.id = id;
            this.containerType = FEATURES;
            this.typeBlock = t; // 0||1||3
            this.header = new appClasses.header(this.id, this.containerType);
            this.firstImageBlock = new appClasses.imageBlock(id);
            this.secondImageBlock = new appClasses.imageBlock(id);
            this.firstTextBllock = new appClasses.textBlock(id, this.typeBlock);
            this.secondTextBlock = new appClasses.textBlock(id, this.typeBlock);
        }

        getContent(){
            return '<!-- Features 1 -->\n' +
                '<div class="wrapper">\n' +
                '<div class="container">\n' +
                '<div class="row">\n' +
                '<section class="col-6 col-12-narrower feature">\n' +
                '<div class="image-wrapper first">\n' +
                '<a href="#" class="image featured first"><img src="images/pic01.jpg" alt="" /></a>\n' +
                '</div>\n' +
                '<header>\n' +
                '<h2>Semper magna neque vel<br />\n' +
                'adipiscing curabitur</h2>\n' +
                '</header>\n' +
                '<p>Lorem ipsum dolor sit amet consectetur et sed adipiscing elit. Curabitur vel\n' +
                'sem sit dolor neque semper magna. Lorem ipsum dolor sit amet consectetur et sed\n' +
                'adipiscing elit. Curabitur vel sem sit.</p>\n' +
                '<ul class="actions">\n' +
                '<li><a href="#" class="button">Elevate my awareness</a></li>\n' +
                '</ul>\n' +
                '</section>\n' +
                '<section class="col-6 col-12-narrower feature">\n' +
                '<div class="image-wrapper">\n' +
                '<a href="#" class="image featured"><img src="images/pic02.jpg" alt="" /></a>\n' +
                '</div>\n' +
                '<header>\n' +
                '<h2>Amet lorem ipsum dolor<br />\n' +
                'sit consequat magna</h2>\n' +
                '</header>\n' +
                '<p>Lorem ipsum dolor sit amet consectetur et sed adipiscing elit. Curabitur vel\n' +
                'sem sit dolor neque semper magna. Lorem ipsum dolor sit amet consectetur et sed\n' +
                'adipiscing elit. Curabitur vel sem sit.</p>\n' +
                '<ul class="actions">\n' +
                '<li><a href="#" class="button">Elevate my awareness</a></li>\n' +
                '</ul>\n' +
                '</section>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>';
        }
    },

    products: class Product{
        constructor(id, t) {
            this.id = id;
            this.blockType = t;
        }

        getContent(){
            let res = '';
            if (this.blockType === 1) {
                res = '<!-- Features 2 -->\n' +
                    '\t\t\t\t<div class="wrapper">\n' +
                    '\t\t\t\t\t<section class="container">\n' +
                    '\t\t\t\t\t\t<header class="major">\n' +
                    '\t\t\t\t\t\t\t<h2>Sed magna consequat lorem curabitur tempus</h2>\n' +
                    '\t\t\t\t\t\t\t<p>Elit aliquam vulputate egestas euismod nunc semper vehicula lorem blandit</p>\n' +
                    '\t\t\t\t\t\t</header>\n' +
                    '\t\t\t\t\t\t<div class="row features">\n' +
                    '\t\t\t\t\t\t\t<section class="col-4 col-12-narrower feature">\n' +
                    '\t\t\t\t\t\t\t\t<div class="image-wrapper first">\n' +
                    '\t\t\t\t\t\t\t\t\t<a href="#" class="image featured"><img src="images/pic03.jpg" alt="" /></a>\n' +
                    '\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t<p>Lorem ipsum dolor sit amet consectetur et sed adipiscing elit. Curabitur\n' +
                    '\t\t\t\t\t\t\t\tvel sem sit dolor neque semper magna lorem ipsum.</p>\n' +
                    '\t\t\t\t\t\t\t</section>\n' +
                    '\t\t\t\t\t\t\t<section class="col-4 col-12-narrower feature">\n' +
                    '\t\t\t\t\t\t\t\t<div class="image-wrapper">\n' +
                    '\t\t\t\t\t\t\t\t\t<a href="#" class="image featured"><img src="images/pic04.jpg" alt="" /></a>\n' +
                    '\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t<p>Lorem ipsum dolor sit amet consectetur et sed adipiscing elit. Curabitur\n' +
                    '\t\t\t\t\t\t\t\tvel sem sit dolor neque semper magna lorem ipsum.</p>\n' +
                    '\t\t\t\t\t\t\t</section>\n' +
                    '\t\t\t\t\t\t\t<section class="col-4 col-12-narrower feature">\n' +
                    '\t\t\t\t\t\t\t\t<div class="image-wrapper">\n' +
                    '\t\t\t\t\t\t\t\t\t<a href="#" class="image featured"><img src="images/pic05.jpg" alt="" /></a>\n' +
                    '\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t<p>Lorem ipsum dolor sit amet consectetur et sed adipiscing elit. Curabitur\n' +
                    '\t\t\t\t\t\t\t\tvel sem sit dolor neque semper magna lorem ipsum.</p>\n' +
                    '\t\t\t\t\t\t\t</section>\n' +
                    '\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t<ul class="actions major">\n' +
                    '\t\t\t\t\t\t\t<li><a href="#" class="button">Elevate my awareness</a></li>\n' +
                    '\t\t\t\t\t\t</ul>\n' +
                    '\t\t\t\t\t</section>\n' +
                    '\t\t\t\t</div>\n' +
                    '\t\t\t<!-- Promo -->\n' +
                    '\t\t\t<div class="promo-wrapper">\n' +
                    '\t\t\t\t<section class="promo"></section>\n' +
                    '\t\t\t</div>';
            }

            if(this.blockType === 2){
                res = '<!-- Text into img-->\n' +
                    '\t\t\t<div class="wrapper">\n' +
                    '\t\t\t\t<section class="container">\n' +
                    '\t\t\t\t\t<header class="major">\n' +
                    '\t\t\t\t\t\t<h2>Sed magna consequat lorem curabitur tempus</h2>\n' +
                    '\t\t\t\t\t\t<p>Elit aliquam vulputate egestas euismod nunc semper vehicula lorem blandit</p>\n' +
                    '\t\t\t\t\t</header>\n' +
                    '\t\t\t\t\t<div class="row features">\n' +
                    '\t\t\t\t\t\t<section class="col-4 col-12-narrower feature">\n' +
                    '\t\t\t\t\t\t\t<div class="image-wrapper feature">\n' +
                    '\t\t\t\t\t\t\t\t<a href="#" class="image featured"><img src="images/pic03.jpg" alt="" /></a>\n' +
                    '\t\t\t\t\t\t\t\t<div ><b>Lorem ipsum dolor sit amet consectetur et sed adipiscing elit. Curabitur\n' +
                    '\t\t\t\t\t\t\t\t\tvel sem sit dolor neque semper magna lorem ipsum.</b></div>\n' +
                    '\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t</section>\n' +
                    '\t\t\t\t\t\t<section class="col-4 col-12-narrower feature">\n' +
                    '\t\t\t\t\t\t\t<div class="image-wrapper">\n' +
                    '\t\t\t\t\t\t\t\t<a href="#" class="image featured"><img src="images/pic04.jpg" alt="" />\n' +
                    '\t\t\t\t\t\t\t\t\t<p>Lorem ipsum dolor sit amet consectetur et sed adipiscing elit. Curabitur\n' +
                    '\t\t\t\t\t\t\t\t\tvel sem sit dolor neque semper magna lorem ipsum.</p>\n' +
                    '\t\t\t\t\t\t\t\t</a>\n' +
                    '\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t</section>\n' +
                    '\t\t\t\t\t\t<section class="col-4 col-12-narrower feature">\n' +
                    '\t\t\t\t\t\t\t<div class="image-wrapper">\n' +
                    '\t\t\t\t\t\t\t\t<a href="#" class="image featured"><img src="images/pic05.jpg" alt="" /></a>\n' +
                    '\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t<p>Lorem ipsum dolor sit amet consectetur et sed adipiscing elit. Curabitur\n' +
                    '\t\t\t\t\t\t\t\tvel sem sit dolor neque semper magna lorem ipsum.</p>\n' +
                    '\t\t\t\t\t\t</section>\n' +
                    '\t\t\t\t\t</div>\n' +
                    '\t\t\t\t</section>\n' +
                    '\t\t\t</div>';
            }

            return res;
        }

    }
} || appClasses;


var appNames = appNames|| {

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
};

$(document).ready(function(){
//      $('.elem-icons').draggable();

    $('#nosidebar').click(function () {
        $('.contentblock').append(function () {
            let atr = new Map();
            appNames.arrObj.push(new appClasses.block(appNames.idCounter(), MBLOCK, 1));
            atr.set('header', new Map([['headerText', 'Header'],
                                       ['paragrathText', 'Elit aliquam vulputate egestas euismod nunc semper vehicula lorem blandit']]));
            atr.set('imageBlock', new Map([['blockHref','#'],
                                          ['imgRef','images/pic01.jpg']]));
            atr.set('textBlock','<p>Ut sed tortor luctus, gravida nibh eget, volutpat odio. Proin rhoncus, sapien' +
                'mollis luctus hendrerit, orci dui viverra metus, et cursus nulla mi sed elit. Vestibulum' +
                'condimentum, mauris a mattis vestibulum, urna mauris cursus lorem, eu fringilla lacus' +
                'ante non est. Nullam vitae feugiat libero, eu consequat sem.</p>');
            appNames.arrObj[appNames.arrObj.length-1].setContent(atr);
            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        appNames.editBlock();
    });

   /* $('#nosidebarv2').click(function () {
        $('.contentblock').append(function () {
            appNames.arrObj.push(new appClasses.block(appNames.idCounter(), MBLOCK, 2));
            appNames.arrObj[appNames.arrObj.length-1].setContent(undefined,undefined,undefined,"#", "images/pic01.jpg");
            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        appNames.editBlock();
    });

    $('#leftsidebar').click(function () {
        $('.contentblock').append(function () {
            appNames.arrObj.push(new appClasses.block(appNames.idCounter(), SBRBLOCK, 1));
            appNames.arrObj[appNames.arrObj.length-1].imageBlock.setRef("#", "images/pic01.jpg");
            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        appNames.editBlock();
    });

    $('#rightsidebar').click(function () {
        $('.contentblock').append(function () {
            appNames.arrObj.push(new appClasses.block(appNames.idCounter(), SBRBLOCK, 2));
            appNames.arrObj[appNames.arrObj.length-1].imageBlock.setRef("#", "images/pic01.jpg");
            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        appNames.editBlock();
    });

    $('#features').click(function () {
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
    });

    $('#productgrid').click(function () {
        $('.contentblock').append(function () {
            appNames.arrObj.push(new appClasses.products(appNames.idCounter(), 2));
            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        appNames.editBlock();
    });*/
});