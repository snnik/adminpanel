// Image Section

var appClasses = appClasses  || {
    imageBlock: class ImageContainer{
            constructor(id){
                this.id = id;
                this.imgRef = '';
                this.imgAlt = '';
                this.blockHref = '';
                this.blockClasses = 'class="image featured"';
            }

            setRef(newHref, newRef){
                this.imgRef = 'src ="' + newRef + '"';
                this.blockHref = 'href = "' + newHref + '"';
            }

            getContent(){
                return '<a ' + this.blockHref + ' ' + this.blockClasses + '><img = ' + this.imgRef + ' ' + this.imgAlt + ' /></a>';
            }
        },

// Text section
    textBlock: class TextContainer{
            constructor(id, blockType){
                this.id = id;
                if (blockType === 1) {
                    this.blockClass = 'class = "summernote"';
                }
                if (blockType === 2) {
                    this.blockClass = 'class = "summernote col-5 col-12-mobile"';
                }
                this.tContent = '';
            }

            setTextBlock(t){
                this.tContent = t;
            }

            getTextBlock(){
                return '<div ' + this.blockClass + '>\n' +
                    this.tContent +
                    '</div>\n';
            }

            },

//header content
    headerBlock: class HeaderContainer {
            constructor(blockType, t, p = NaN){
                this.blockType = blockType;
                if (this.blockType === 'MAIN'){
                    this.headerText = t;
                    this.paragrathText = p;
                }

                if (this.blockType === 'SECTION'){
                    this.headerText = t;
                }
            }

            getHeader(){
                if (this.blockType === 'MAIN'){
                    return '<header>\n' +
                        '<h2>' + this.headerText + '</h2>\n' +
                        '<p>' + this.paragrathText + '</p>\n' +
                        '</header>\n';
                }
            }
    },

    mainBlock:class MainContainer{
            constructor(id, t){
                this.id = id;
                this.imageBlock = new appClasses.imageBlock('img_' + id);
                this.wrapperType = 'class = "wrapper"';
                this.containerType = 'class = "container main"';
                this.thisBlock = 'NO_SIDEBAR';
                this.typeBlock = t;
                this.headerText = new appClasses.headerBlock('MAIN', 'No Sidebar', 'Lorem ipsum dolor sit amet consectetur et sed adipiscing elit \n tdolor neque semper.');
                this.textBlock = new appClasses.textBlock('txt_' + id, this.typeBlock);

            }

            getContent(){
                this.textBlock.setTextBlock('<p>Ut sed tortor luctus, gravida nibh eget, volutpat odio. Proin rhoncus, sapien' +
                    'mollis luctus hendrerit, orci dui viverra metus, et cursus nulla mi sed elit. Vestibulum' +
                    'condimentum, mauris a mattis vestibulum, urna mauris cursus lorem, eu fringilla lacus' +
                    'ante non est. Nullam vitae feugiat libero, eu consequat sem.');

                if (this.typeBlock === 1){
                    return '<!-- No Sidebar -->\n' +
                        '<div id="'+this.id+'" ' + this.wrapperType + '>\n' +
                        '<div ' + this.containerType + '>\n' +
                        '<!-- Content -->\n' +
                        '<article class="content">\n' +
                        this.headerText.getHeader() +
                        this.imageBlock.getContent() + '\n' +
                        this.textBlock.getTextBlock() +
                        '</article>\n' +
                        '</div>\n' +
                        '</div>';
                }

                if (this.typeBlock === 2) {
                    return '<!-- No Sidebar version 2 -->\n' +
                        '<div id="'+this.id+'" ' + this.wrapperType + '>\n' +
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
                        '</div>\n';
                }
            }
        }
}


var appNames = appNames|| {

    idCounter:(function(){
        let counter = 0;
        return function(){
            return counter++;
        };
    })(),

    arrObj:[],

    editBlock: function setSummernote(){
        $('.summernote').summernote({
            toolbar: [
                // [groupName, [list of button]]
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ]
        });
    }
}

$(document).ready(function(){
//      $('.elem-icons').draggable();

    $('#mainBlock').click(function () {
        $('.contentblock').append(function () {
            appNames.arrObj.push(new appClasses.mainBlock(appNames.idCounter(), 1));
            appNames.arrObj[appNames.arrObj.length-1].imageBlock.setRef("#", "images/pic01.jpg");
            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        appNames.editBlock();
    });

    $('#mainBlockv2').click(function () {
        $('.contentblock').append(function () {
            appNames.arrObj.push(new appClasses.mainBlock(appNames.idCounter(), 2));
            appNames.arrObj[appNames.arrObj.length-1].imageBlock.setRef("#", "images/pic01.jpg");
            return appNames.arrObj[appNames.arrObj.length-1].getContent();
        });
        appNames.editBlock();
    });

});



