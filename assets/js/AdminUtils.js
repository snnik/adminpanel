// Image Section

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
            this.blockClasses = 'class="image featured"';
        }

        setRef(newHref, newRef) {
            this.imgRef = 'src ="' + newRef + '"';
            this.blockHref = 'href = "' + newHref + '"';
        }

        getContent() {
            return '<a ' + this.blockHref + ' ' + this.blockClasses + '><img = ' + this.imgRef + ' ' + this.imgAlt + ' /></a>';
        }
    },

// Text section
    textBlock: class TextContainer {
        constructor(id, blockType) {
            this.id = id;
            if (blockType === 1) {
                this.blockClass = 'class = "summernote"';
            }
            if (blockType === 2) {
                this.blockClass = 'class = "summernote col-5 col-12-mobile"';
            }
            this.tContent = '';
        }

        setTextBlock(t) {
            this.tContent = t;
        }

        getTextBlock() {
            return '<div ' + this.blockClass + '>\n' +
                '<p>' + this.tContent + '</p>\n' +
                '</div>\n';
        }

    },

//header content
    headerBlock: class HeaderContainer {
        constructor(blockType, t, p = NaN) {
            this.blockType = blockType;
            if (this.blockType === 'MAIN') {
                this.headerText = t;
                this.paragrathText = p;
            }

            if (this.blockType === 'SECTION') {
                this.headerText = t;
            }
        }

        getHeader() {
            if (this.blockType === 'MAIN') {
                return '<header>\n' +
                    '<h2>' + this.headerText + '</h2>\n' +
                    '<p>' + this.paragrathText + '</p>\n' +
                    '</header>\n';
            }
            if (this.blockType === 'SECTION') {
                return '<header>\n' +
                    '<h3>' + this.headerText + '</h3>\n' +
                    '</header>\n';
            }
        }
    },

    sidebarBlock: class sidebarContainer {
        constructor(id, t) {
            this.id = id;
            this.sidebarImage = new appClasses.imageBlock('sbimg_' + id);
            this.sidebarText = new appClasses.textBlock('sbtxt_' + id);
            this.headerText = new appClasses.headerBlock('MAIN', 'Left Sidebar', 'Lorem ipsum dolor sit amet consectetur et sed adipiscing elit \n tdolor neque semper.');
            this.sidebarHeader = new appClasses.headerBlock('SECTION', 'Elit sed feugiat');
        }


        getContent() {
            return '<div class="col-4 col-12-narrower">\n' +
                '<section class="sidebar">\n' +
                '<section>\n' +
                '<header>\n' +
                '<h3>Elit sed feugiat</h3>\n' +
                '</header>\n' +
                '<p>Lorem ipsum dolor sit amet consectetur et sed adipiscing elit. Curabitur et vel\n' +
                'sem sit amet dolor neque semper magna. Lorem ipsum dolor sit amet consectetur et dolore\n' +
                'tadipiscing elit. Curabitur vel sem sit.</p>\n' +
                '<ul class="actions">\n' +
                '<li><a href="#" class="button">Magna amet nullam</a></li>\n' +
                '</ul>\n' +
                '</section>\n' +
                '<section>\n' +
                '<a href="#" class="image featured"><img src="images/pic07.jpg" alt="" /></a>\n' +
                '<header>\n' +
                '<h3>Commodo lorem varius</h3>\n' +
                '</header>\n' +
                '<p>Lorem ipsum dolor sit amet consectetur et sed adipiscing elit. Curabitur et vel\n' +
                'sem sit amet dolor neque semper magna. Lorem ipsum dolor sit amet consectetur et dolore\n' +
                'adipiscing elit. Curabitur vel sem sit.</p>\n' +
                '<ul class="actions">\n' +
                '<li><a href="#" class="button">Ipsum sed dolor</a></li>\n' +
                '</ul>\n' +
                '</section>\n' +
                '</section>\n' +
                '</div>\n';
        }
    },

    block: class BlockContainer {
        constructor(id, t) {
            this.id = id;
            this.imageBlock = new appClasses.imageBlock('img_' + id);
            this.wrapperType = 'wrapper';
            this.containerType = 'class = "container main"';
            this.thisBlock = 'NO_SIDEBAR';
            this.typeBlock = t;
            this.headerText = new appClasses.headerBlock('MAIN', 'No Sidebar', 'Lorem ipsum dolor sit amet consectetur et sed adipiscing elit \n tdolor neque semper.');
            this.textBlock = new appClasses.textBlock('txt_' + id, this.typeBlock);

        }

        getContent() {
            this.textBlock.setTextBlock('<p>Ut sed tortor luctus, gravida nibh eget, volutpat odio. Proin rhoncus, sapien' +
                'mollis luctus hendrerit, orci dui viverra metus, et cursus nulla mi sed elit. Vestibulum' +
                'condimentum, mauris a mattis vestibulum, urna mauris cursus lorem, eu fringilla lacus' +
                'ante non est. Nullam vitae feugiat libero, eu consequat sem.');


                return '<!-- No Sidebar -->\n' +
                    '<div id="' + this.id + '" class = "' + this.wrapperType + '">\n' +
                    '<div ' + this.containerType + '>\n' +
                    '<!-- Content -->\n' +
                    '<article class="content">\n' +
                    this.headerText.getHeader() +
                    this.typeBlock === 2 ? '<div class="row">\n <div class = "col-7 col-12-mobile">\n' : '' +
                    this.imageBlock.getContent() + '\n' +
                    this.typeBlock === 2 ? '</div>\n' : '' +
                    this.textBlock.getTextBlock() +
                    this.typeBlock === 2 ? '<div>\n' : '' +
                    '</article>\n' +
                    '</div>\n' +
                    '</div>\n' +
                    appClasses.promoBlock();


/*            if (this.typeBlock === 0) {
                return '<!-- No Sidebar -->\n' +
                    '<div id="' + this.id + '" class = "' + this.wrapperType + '">\n' +
                    '<div ' + this.containerType + '>\n' +
                    '<!-- Content -->\n' +
                    '<article class="content">\n' +
                    this.headerText.getHeader() +
                    '<div class="row">\n' +
                    '<div class = "col-7 col-12-mobile">\n' +
                    this.imageBlock.getContent() + '\n' +
                    '</div>\n' +
                    this.textBlock.getTextBlock() +
                    '</div>\n' +
                    '</article>\n' +
                    '</div>\n' +
                    '</div>\n' +
                    appClasses.promoBlock();
            }*/
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
            appNames.arrObj.push(new appClasses.block(appNames.idCounter(), 1));
            appNames.arrObj[appNames.arrObj.length-1].imageBlock.setRef("#", "images/pic01.jpg");
            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        appNames.editBlock();
    });

    $('#nosidebarv2').click(function () {
        $('.contentblock').append(function () {
            appNames.arrObj.push(new appClasses.block(appNames.idCounter(), 2));
            appNames.arrObj[appNames.arrObj.length-1].imageBlock.setRef("#", "images/pic01.jpg");
            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        appNames.editBlock();
    });

    $('#leftsidebar').click(function () {
        $('.contentblock').append(function () {
            appNames.arrObj.push(new appClasses.sidebarBlock(appNames.idCounter(), 1));
            // appNames.arrObj[appNames.arrObj.length-1].imageBlock.setRef("#", "images/pic01.jpg");
            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        appNames.editBlock();
    });
});



