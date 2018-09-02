<!DOCTYPE html>
<html lang="en" ng-app="app">
  <head>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv='expires' content='-1'>
    <meta http-equiv='pragma' content='no-cache'>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Selfplix - Earn points and redeem prizes just by posting a selfie.</title>
    <link rel="shortcut icon" href="{{ asset('img/logo/camera3.png') }}" type="image/ico">

    <link rel="stylesheet" type="text/css" href="../css/fonts.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/landing/css/header-style.css">
    <link rel="stylesheet" type="text/css" href="../assets/landing/css/footer-style.css">
    <link rel="stylesheet" type="text/css" href="../assets/landing/css/style.css">
    <link rel="stylesheet" type="text/css" href="../assets/landing/css/responsive.css">
    <link rel="stylesheet" type="text/css" href="../css/loader.css">
    <link rel="stylesheet" type="text/css" href="../css/custom.css">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-124730031-1"></script>
    <script>
      if( window.location.hostname != 'localhost' ){
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-124730031-1');
      }
    </script>

    <style type="text/css">
      .header-container {
          background-color: #0e6471;
      }
    </style>
  </head>
  <body>

    <header style="background-image: url('../img/mug-bag-autumn-weather-happy_1157-3983.jpg')">
      <div class="banner-overlay"></div>

      <div class="header-container">
        <div class="header-nav">
          <ul class="nav pull-left">
              <li ui-sref="home" class="brand-name">
                  <a href="javascript:void(0)" ui-sref="home">
                    <img src="../img/logo/camera-logo-white.png">
                    <span>Selfplix</span>
                  </a>
              </li>
          </ul>
          
          <ul class="nav pull-right non-mobile-nav">
            <li><a href="/">Home</a></li>
            <li><a href="/about-us">About us</a></li>
            <li class="active"><a href="/contact">Contact</a></li>
            <li class="login-li"><a href="javascript:void(0)" onclick="window.location.href = 'app'">Login</a></li>
          </ul>

          <ul class="nav pull-right mobile-nav">
            <li><a href="javascript:void(0)" class="toggleMobileMenu"><i class="fa fa-navicon"></i></a></li>
          </ul>
        </div>
      </div>
    </header>

    <section class="body-section">
      <div class="contact-us-container">
        <p class="contact-title">
          Contact Us
        </p>

        <p class="contact-text">For concern and inquiries. Please email and reach us here.<br>We would love to help you.</p>
        <p class="email">info.selfplix@gmail.com</p>
      </div>
    </section>

    <footer>
      <div class="footer-container">
        <p class="copyright">
          Copyright &copy; 2018 Selfplix.com All rights reserved.
        </p>
      </div>
    </footer>

  </body>


  <script type="text/javascript" src="<?php echo $server; ?>/js/jquery.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/moment.min.js"></script>
  <script type="text/javascript" src="<?php echo $server; ?>/js/landing.js"></script>

</html>