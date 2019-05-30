// Dom7
var $$ = Dom7;

var app = new Framework7({
  root: '#app',
  name: 'Upload',
  id: 'com.ask.upload.foto',
  init: true,
  initOnDeviceReady: true,
  
  touch: {
    disableContextMenu: false,
  },
  
  // App root data
  data: function () {
    return {
      // db: null,
      user: 'drv1',
      password: null,
      foto: null,
      bLogedIn: false,
      // token: null,
    };
  },
  // App root methods
  methods: {
    takePicture: function () {
      // app.dialog.alert('Hello World!');
    },
    // uploadFoto: function (dn) {
    // }
  },
  on: {

    init: function () { // sama dengan onDeviceReady

    }
  },      
  routes: [
    // Add your routes here
    // Example:
    
    {
      path: '/',
      url: './pages/upload.html',  
      on: {
        pageInit: function(e, page) {
          
          // ambil foto
          $$('.btn-foto').on('click', function (e) {
            // app.dialog.alert('Take photo!');
            // return false;
            
            var options = {
              quality: 10,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              mediaType: Camera.MediaType.PICTURE,
              targetWidth: 320, // 360
              targetHeight: 480, // 360
              allowEdit: true,
              correctOrientation: true  //Corrects Android orientation quirks
              // popoverOptions: CameraPopoverOptions,
              // saveToPhotoAlbum: false
            };

            // update camera image directive
            navigator.camera.getPicture(options).then(function (imageData) {
              $$('#cameraimage').src = "data:image/jpeg;base64," + imageData;
            }, function (err) {
              // console.log('Failed because: ');
              app.dialog.alert(err);
            });
          });
          
          
          // upload foto ke server
          // $$('.btn-upload').on('click', function (e) {
            
            // app.dialog.alert('Upload photo!');
            // return false;
  
            // app.preloader.show();
            
            // var formData = app.form.convertToData('.upload-form');          
            
            // this.request.post('https://apgroup.id/api/method', formData,
            
            // function (res) { // sukses
              // app.preloader.hide();
                  
            // },
            // function (xhr, status) { // gagal
    
              // app.preloader.hide();
              // app.dialog.alert('Upload foto gagal!', 'Login User');
            // });
          // });
        }
      }
    },
    
  ],
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});

var mainView = app.views.create('.view-main', {
  url: '/'
});

$$(document).on('backbutton', function (e) {

  e.preventDefault();

  // for example, based on what and where view you have
  if (app.views.main.router.url == '/') {
    navigator.app.exitApp();
  }
});

app.on('pageInit', function (page) {

  $$('input').on('focus', function () {
    
    $$('.kb').css('height', '280px');
    //var limit = $$(window).height() - 280;

    if ($$(this).offset().top > 280) {
      $$('.page-content').scrollTop($$(this).offset().top-168);
    }
  });

  $$('input').on('blur', function () {
    $$('.kb').css('height', '0px');
  });
});