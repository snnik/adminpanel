const MAINBLOCK = 'MAIN',
      SIDEBARBLOCK = 'SIDEBAR',
      FEATURES = 'FEATURES',
      PRODUCTS = 'PRODUCT',
      HEADER = 'HEADER',
      IMAGE = 'IMAGE',
      TCONTENT = 'CONTENT';

class Protoblock{
    constructor(id, blocktype, blockmake){
        this.id = id;
        this.blockType = blocktype; //const
        this.blockMake = blockmake || 0; //1||2||3 or const for header
    }

    setContent(atr){
        for (let pair of atr.entries()){
            if(this[pair[0]] instanceof Object){
                this[pair[0]].setContent(pair[1]);
            }else{
                this[pair[0]] = pair[1]||this[pair[0]];
            }

        }
    }

    getContent(content){
        return content.content;
    }

    getPreview(){
        return this.preview.content;
    }

}

//Image class.
class ImageContainer extends Protoblock{
    constructor(id) {
        super(id, IMAGE)
        this.imgRef = '';
        this.imgAlt = '';
        this.blockHref = '#';
        this.blockClasses = 'image featured'; // возможно надо удалить
    }

    content() {
        let content = '<a href = "' + this.blockHref + '" class="' + this.blockClasses + '"><img src="' + this.imgRef + '" ' + this.imgAlt + ' /></a>';
    }
}

// Text section
class TextContainer extends Protoblock{
    constructor(id, blockmake) {
        super(id, TCONTENT, blockmake)
        this.id = id;
        if (this.blockmake === 1) {
            this.blockClass = 'summernote';
        }
        if (this.blockmake === 2) {
            this.blockClass = 'summernote col-5 col-12-mobile';
        }
        this.tContent = '';
    }

    setContent(t) {
        this.tContent = t;
    }

    content() {
        let content = '<div class = "' + this.blockClass + '">\n' +
            '<p>' + this.tContent + '</p>\n' +
            '</div>\n';
    }

}

//header content
class HeaderContainer extends Protoblock{
    constructor(id, bt) {
        super(id, HEADER, bt)
        this.header = '';
        this.paragrath = '';
    }

    content() {
        let content = '';
        if (this.blockMake === MAINBLOCK) {
            content = '<header>\n' +
                '<h2>' + this.header + '</h2>\n' +
                '<p>' + this.paragrath + '</p>\n' +
                '</header>\n';
        }
        if (this.blockMake === SIDEBARBLOCK) {
            content = '<header>\n' +
                '<h3>' + this.header + '</h3>\n' +
                '</header>\n';
        }
        if(this.blockMake === FEATURES){
            content = '<header>\n' +
                '<h2>' + this.header + '</h2>\n' +
                '</header>\n';
        }
    }
}

class SidebarContainer extends Protoblock{ // Переделать
    constructor(id) {
        super(id, SIDEBARBLOCK)
        this.header1 = '';
        this.header2 = '';
        this.paragrath1 = '';
        this.paragrath2 = '';
        this.imgHref = '';
        this.imgSrc = '';
    }

    content() {
        let content ='<div class="col-4 col-12-narrower">\n<section class="sidebar">\n<section>\n';
        content +='<header>\n<h3>'+this.header1 +'</h3>\n</header>\n';
        content +='<p>'+this.paragrath1+'</p>\n';
        content +='</section>\n<section>\n';
        content +='<a href="'+ this.imgHref+'" class="image featured"><img src="'+this.imgSrc+'" alt="" /></a>\n';
        content +='<header>\n';
        content +='<h3>'+this.header2+'</h3>\n</header>\n';
        content +='<p>'+this.paragrath2+'</p>\n';
        content +='</section>\n</section>\n</div>\n';
    }
}

class MainContainer extends Protoblock{
    constructor(id, typeblock, blockmake) {
        super(id, typeblock, blockmake);
        this.header = new HeaderContainer(this.id, this.blockType);
        this.image = new ImageContainer(id);
        this.tBlock = new TextContainer(id, this.blockMake);
        if (this.blockType === SIDEBARBLOCK){
            this.sidebar = new SidebarContainer(this.id);
        }
    }

    content() {
        let content = '<!-- Block -->\n';
        content += '<div id="' + this.id + '" class = "wrapper">\n' +
            '<div class = "container main">\n';
        content += (this.blockMake === 1 && this.blockType === SIDEBARBLOCK) ? '<div class="row gtr-150">\n' +
            this.sidebar.getContent()+'<div class="col-8 col-12-narrower">\n' : '';
        content += (this.blockMake === 2 && this.blockType === SIDEBARBLOCK) ? '<div class="row gtr-150">\n<div class="col-8 col-12-narrower">\n' : '';
        content +='<!-- Content -->\n'+
                    '<article class="content">\n'+
                        this.header.getContent();
        content += (this.blockMake === 2 && this.blockType === MAINBLOCK) ? '<div class="row">\n <div class = "col-7 col-12-mobile">\n' : '';
        content += this.image.getContent() + '\n';
        content += (this.typeBlock === 2 && this.blockType === MAINBLOCK) ? '</div>\n' : '';
        content += this.tBlock.getContent();
        content += (this.blockMake === 2 && this.blockType === MAINBLOCK) ? '<div>\n' : '';
        content +='</article>\n';
        content += (this.blockMake === 1 && this.blockType === SIDEBARBLOCK) ? '</div>\n</div>\n' : '';
        content += (this.blockMake === 2 && this.blockType === SIDEBARBLOCK) ? '</div>\n'+this.sidebar.getContent()+'</div>\n' : '';
        content +='</div>\n</div>\n<!-- End Block -->\n';
    }
}

/*class Features{
        constructor(id){
            this.id = id;
            this.blockType = FEATURES;
            this.typeBlock = 1;
            this.firstHeader = new appClasses.header(this.id, this.blockType);
            this.secondHeader = new appClasses.header(this.id, this.blockType);
            this.firstImageBlock = new appClasses.imageBlock(id);
            this.secondImageBlock = new appClasses.imageBlock(id);
            this.firstTextBllock = new appClasses.tBlock(id, this.typeBlock);
            this.secondTextBlock = new appClasses.tBlock(id, this.typeBlock);
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
    }*/

/*class Product{
        constructor(id, t) {
            this.id = id;
            this.typeBlock = t;
            this.header = new appClasses.header(this.id, MAINBLOCK);
            this.blocks = [];
        }

        addBlock(txt, img){
            this.blocks.push(new Map([['tBlock', new appClasses.tBlock(this.id, 1)],
                                    ['imageBlock', new appClasses.imageBlock(this.id)]]));
            this.blocks[this.blocks.length-1].get('tBlock').setContent(txt);
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
                    this.blocks[i].get('tBlock').getContent() +
                    '</div>\n' +
                    this.blocks[i].get('imageBlock').getContent() +
                    '</section>\n';
                }
                res +='</div>\n</section>\n</div>\n';

            return res;
        }

    }*/



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
                    appNames.arrObj.push(new MainContainer(appNames.idCounter(), MAINBLOCK, blocktype));
                }

                if  (target.id === 'rightsidebar' || target.id === 'leftsidebar') {
                    appNames.arrObj.push(new MainContainer(appNames.idCounter(), SIDEBARBLOCK, blocktype));
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

                atr.set('header', new Map([['header', 'HeaderContainer'],
                                        ['paragrath', 'Elit aliquam vulputate egestas'+
                                        ' euismod nunc semper vehicula lorem blandit']]));
                atr.set('image', new Map([['blockHref', '#'],
                                        ['imgRef', 'images/pic01.jpg']]));
                atr.set('tBlock', '<p>Ut sed tortor luctus, gravida nibh eget, volutpat odio. Proin rhoncus, sapien' +
                    'mollis luctus hendrerit, orci dui viverra metus, et cursus nulla mi sed elit. Vestibulum' +
                    'condimentum, mauris a mattis vestibulum, urna mauris cursus lorem, eu fringilla lacus' +
                    'ante non est. Nullam vitae feugiat libero, eu consequat sem.</p>');
                appNames.arrObj[appNames.arrObj.length - 1].setContent(atr);
            }

/*                if (target.id === 'features'){
                    appNames.arrObj.push(new appClasses.features(appNames.idCounter()));

                    atr.set('firstHeader', new Map([['header', 'HeaderContainer']]));
                    atr.set('secondHeader', new Map([['header', 'HeaderContainer']]));
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
                }*/


            return appNames.arrObj[appNames.arrObj.length - 1].getContent(appNames.arrObj[appNames.arrObj.length-1].content());
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

/*    $('#productgrid').click(function () {
        $('.contentblock').append(function () {
            appNames.arrObj.push(new appClasses.products(appNames.idCounter(), 2));
            appNames.arrObj[appNames.arrObj.length-1].setContent(
                new Map([['header', 'HeaderContainer'],
                ['paragrath', 'Elit aliquam vulputate egestas euismod nunc semper vehicula lorem blandit']]),
                '<p>Ut sed tortor luctus, gravida nibh eget, volutpat odio. Proin rhoncus, sapien' +
                'mollis luctus hendrerit, orci dui viverra metus, et cursus nulla mi sed elit. Vestibulum' +
                'condimentum, mauris a mattis vestibulum, urna mauris cursus lorem, eu fringilla lacus' +
                'ante non est. Nullam vitae feugiat libero, eu consequat sem.</p>',
                new Map([['blockHref','#'],['imgRef','images/pic01.jpg']]));

            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        //appNames.editBlock();
    });*/
});