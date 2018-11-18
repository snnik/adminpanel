const MBLOCK = 'MAIN',
      SBRBLOCK = 'SIDEBAR',
      FEATURES = 'FEATURES';

let appClasses = {

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
            if(this.typeContent === FEATURES){
                return '<header>\n' +
                    '<h2>' + this.headerText + '</h2>\n' +
                    '</header>\n';
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
            if (this.containerType === SBRBLOCK){this.sidebar = new appClasses.sidebar(this.id);}

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
            this.typeBlock = 1;
            this.firstHeader = new appClasses.header(this.id, this.containerType);
            this.secondHeader = new appClasses.header(this.id, this.containerType);
            this.firstImageBlock = new appClasses.imageBlock(id);
            this.secondImageBlock = new appClasses.imageBlock(id);
            this.firstTextBllock = new appClasses.textBlock(id, this.typeBlock);
            this.secondTextBlock = new appClasses.textBlock(id, this.typeBlock);
        }

        setContent(atr){
            for (let pair of atr.entries()){
                this[pair[0]].setContent(pair[1]);
            }
        }

        getContent(){
            return '<!-- Features 1 -->\n' +
                '<div class="wrapper">\n' +
                '<div class="container">\n' +
                '<div class="row">\n' +
                '<section class="col-6 col-12-narrower feature">\n' + //12
                '<div class="image-wrapper first">\n' +
                this.firstImageBlock.getContent() +
                '</div>\n' +
                this.firstHeader.getContent() +
                this.firstTextBllock.getContent() +
                '</section>\n<section class="col-6 col-12-narrower feature">\n' + //12
                '<div class="image-wrapper">\n' +
                this.secondImageBlock.getContent() +
                '</div>\n' +
                this.secondHeader.getContent()+
                this.secondTextBlock.getContent()+
                '</section>\n' +
                '</div>\n' +
                '</div>\n' +
                '</div>';
        }
    },

    products: class Product{
        constructor(id, t) {
            this.id = id;
            this.typeBlock = t;
            this.header = new appClasses.header(this.id, MBLOCK);
            this.blocks = [];
        }

        addBlock(txt, img){
            this.blocks.push(new Map([['textBlock', new appClasses.textBlock(this.id, 1)],
                                    ['imageBlock', new appClasses.imageBlock(this.id)]]));
            this.blocks[this.blocks.length-1].get('textBlock').setContent(txt);
            this.blocks[this.blocks.length-1].get('imageBlock').setContent(img);
        }

        setContent(header, txt, img){
            this.addBlock(txt,img);
            this.header.setContent(header);
        }

        getContent(){
            let res = '';
                res += '<!-- Features 2 -->\n' +
                    '<div id = "product'+this.id+'" class="wrapper">\n' +
                    '<section class="container">\n' +
                    this.header.getContent() +
                    '<div class="row features">\n';

                for(let i = 0; i < this.blocks.length; i++){
                    res +='<section class="col-4 col-12-narrower feature">\n' +
                    '<div class="image-wrapper first">\n' +
                    this.blocks[i].get('textBlock').getContent() +
                    '</div>\n' +
                    this.blocks[i].get('imageBlock').getContent() +
                    '</section>\n';
                }
                res +='</div>\n</section>\n</div>\n';

            return res;
        }

    }
} || appClasses;


let appNames = {

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
}||appNames;

$(document).ready(function(){
//      $('.elem-icons').draggable();

    $('#createbuttons')[0].addEventListener('click', function(event) {

        $('.contentblock').append(function () {
            let target = event.target,
                atr = new Map(),
                blocktype;

                if (target.id ==='nosidebar'||target.id ==='leftsidebar') {
                    blocktype = 1;
                };

                if(target.id === 'nosidebarv2'||target.id ==='rightsidebar'){
                        blocktype = 2;
                };

            if (target.id === 'nosidebar' || target.id === 'nosidebarv2'
                    ||target.id === 'rightsidebar' || target.id === 'leftsidebar') {

                if(target.id === 'nosidebar' || target.id === 'nosidebarv2'){
                    appNames.arrObj.push(new appClasses.block(appNames.idCounter(), MBLOCK, blocktype));
                }

                if  (target.id === 'rightsidebar' || target.id === 'leftsidebar') {
                    appNames.arrObj.push(new appClasses.block(appNames.idCounter(), SBRBLOCK, blocktype));
                    atr.set('sidebar', new Map([['header1', 'Elit sed feugiat'],
                                                ['paragrath1', '<p>Lorem ipsum dolor sit amet consectetur' +
                                                'et sed adipiscing elit. Curabitur et vel sem sit amet dolor' +
                                                'neque semper magna. Lorem ipsum dolor sit amet consectetur et dolore' +
                                                'adipiscing elit. Curabitur vel sem sit.</p>'],
                                                ['header2','Commodo lorem varius'],
                                                ['paragrath2','<p>Lorem ipsum dolor sit amet consectetur' +
                                                'et sed adipiscing elit. Curabitur et vel sem sit amet dolor' +
                                                'neque semper magna. Lorem ipsum dolor sit amet consectetur et dolore' +
                                                'adipiscing elit. Curabitur vel sem sit.</p>'],
                                                ['imgHref','#'],
                                                ['imgSrc','images/pic01.jpg']]));
                    }

                atr.set('header', new Map([['headerText', 'Header'],
                                        ['paragrathText', 'Elit aliquam vulputate egestas'+
                                        ' euismod nunc semper vehicula lorem blandit']]));
                atr.set('imageBlock', new Map([['blockHref', '#'],
                                            ['imgRef', 'images/pic01.jpg']]));
                atr.set('textBlock', '<p>Ut sed tortor luctus, gravida nibh eget, volutpat odio. Proin rhoncus, sapien' +
                    'mollis luctus hendrerit, orci dui viverra metus, et cursus nulla mi sed elit. Vestibulum' +
                    'condimentum, mauris a mattis vestibulum, urna mauris cursus lorem, eu fringilla lacus' +
                    'ante non est. Nullam vitae feugiat libero, eu consequat sem.</p>');
                appNames.arrObj[appNames.arrObj.length - 1].setContent(atr);
            }

                if (target.id === 'features'){
                    appNames.arrObj.push(new appClasses.features(appNames.idCounter()));

                    atr.set('firstHeader', new Map([['headerText', 'Header']]));
                    atr.set('secondHeader', new Map([['headerText', 'Header']]));
                    atr.set('firstImageBlock', new Map([['blockHref', '#'],
                                                        ['imgRef', 'images/pic01.jpg']]));
                    atr.set('secondImageBlock', new Map([['blockHref', '#'],
                                                        ['imgRef', 'images/pic01.jpg']]));
                    atr.set('firstTextBllock', '<p>Ut sed tortor luctus, gravida nibh eget, volutpat odio. Proin rhoncus, sapien' +
                        'mollis luctus hendrerit, orci dui viverra metus, et cursus nulla mi sed elit. Vestibulum' +
                        'condimentum, mauris a mattis vestibulum, urna mauris cursus lorem, eu fringilla lacus' +
                        'ante non est. Nullam vitae feugiat libero, eu consequat sem.</p>');
                    atr.set('secondTextBlock', '<p>Ut sed tortor luctus, gravida nibh eget, volutpat odio. Proin rhoncus, sapien' +
                        'mollis luctus hendrerit, orci dui viverra metus, et cursus nulla mi sed elit. Vestibulum' +
                        'condimentum, mauris a mattis vestibulum, urna mauris cursus lorem, eu fringilla lacus' +
                        'ante non est. Nullam vitae feugiat libero, eu consequat sem.</p>');

                    appNames.arrObj[appNames.arrObj.length - 1].setContent(atr);
                }


            return appNames.arrObj[appNames.arrObj.length - 1].getContent();
        });
       //appNames.editBlock();
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

    $('#productgrid').click(function () {
        $('.contentblock').append(function () {
            appNames.arrObj.push(new appClasses.products(appNames.idCounter(), 2));
            appNames.arrObj[appNames.arrObj.length-1].setContent(
                new Map([['headerText', 'Header'],
                ['paragrathText', 'Elit aliquam vulputate egestas euismod nunc semper vehicula lorem blandit']]),
                '<p>Ut sed tortor luctus, gravida nibh eget, volutpat odio. Proin rhoncus, sapien' +
                'mollis luctus hendrerit, orci dui viverra metus, et cursus nulla mi sed elit. Vestibulum' +
                'condimentum, mauris a mattis vestibulum, urna mauris cursus lorem, eu fringilla lacus' +
                'ante non est. Nullam vitae feugiat libero, eu consequat sem.</p>',
                new Map([['blockHref','#'],['imgRef','images/pic01.jpg']]));

            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        //appNames.editBlock();
    });
});