// Dom7
var $$ = Dom7;

var app = new Framework7({
  root: '#app',
  name: 'ASKITCHEN',
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
  
      navigator.device.capture.captureImage( function(mediaFiles) {
        // var i, path, len;
        // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            // path = mediaFiles[i].fullPath;
            // do something interesting with the file
        // }
        
        $$('#cameraimage').src = mediaFiles[0].fullPath;
        // $$('#filepath').text(mediaFiles[0].fullPath);
      
      }, function (message) {
        alert('Failed because: ' + message);
        
      }, {limit: 1});
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
              destinationType: destinationType.DATA_URL,
              sourceType: pictureSource.CAMERA,
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
              // console.log(err);
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


// Login Screen
$$('#my-login-screen .login-button').on('click', function () {
  
  var user = $$('#my-login-screen [name="usr"]').val();
  if (user == '') {
      app.dialog.alert('Masukkan data user.', 'Login User');
      return;
  }

  var password = $$('#my-login-screen [name="pwd"]').val();
  if (password == '') {
      app.dialog.alert('Masukkan password.', 'Login User');
      return;
  }
  
  app.preloader.show();

  var formData = app.form.convertToData('.login-form');

  // var regId = localStorage.getItem('RegId');
  // formData.gcmid = regId;

  
  app.request.post('https://apgroup.id/api/method/login', formData, function (res) {
    
    app.preloader.hide();
    
    // console.log(res)
    var data = JSON.parse(res);

    if (data.message == 'Logged In') {
    
  //     localStorage.setItem('user', user);
  //     localStorage.setItem('password', password);

      app.loginScreen.close('#my-login-screen');
      
      app.data.bLogedIn = true;
      app.data.user     = user;
      app.data.password = password;
      // app.data.token = data.token;
      
      // kosongkan isian nomor pin
      $$('#my-login-screen [name="pwd"]').val('');

    }
  },
  function (xhr, status) {
    
    app.preloader.hide();
    app.dialog.alert('Invalid user!', 'Login User');
  });
});

$$('#my-login-screen').on('loginscreen:opened', function (e, loginScreen) {
  // set data ke form login
  $$('#my-login-screen [name="usr"]').val(localStorage.getItem('email'));
});

$$(document).on('backbutton', function (e) {

  e.preventDefault();

  // for example, based on what and where view you have
  if (app.views.main.router.url == '/') {
    
    if (!bBackPressed) {
      
      bBackPressed = true;

      // show toast
      var toast = app.toast.create({
        text: 'Press back once again to exit.',
        on: {
          opened: function () {
            // console.log('Toast opened')
          }
        }
      })
    } else {
      navigator.app.exitApp();
    }
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