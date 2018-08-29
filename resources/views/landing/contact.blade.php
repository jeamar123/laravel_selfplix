<!DOCTYPE html>
<html lang="en" ng-app="app">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Selfplix - Earn points and redeem prizes</title>
    <link rel="shortcut icon" href="{{ asset('img/logo/camera3.png') }}" type="image/ico">

    <link rel="stylesheet" type="text/css" href="../css/fonts.css">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../assets/landing/css/header-style.css">
    <link rel="stylesheet" type="text/css" href="../assets/landing/css/footer-style.css">
    <link rel="stylesheet" type="text/css" href="../assets/landing/css/style.css">
    <link rel="stylesheet" type="text/css" href="../css/loader.css">
    <link rel="stylesheet" type="text/css" href="../css/custom.css">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-124730031-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-124730031-1');
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
          
          <ul class="nav pull-right">
            <li><a href="/">Home</a></li>
            <!-- <li><a href="/about-us">About us</a></li> -->
            <li class="active"><a href="/contact">Contact</a></li>
            <li class="login-li"><a href="javascript:void(0)" onclick="window.location.href = 'app'">Login</a></li>
          </ul>
        </div>
      </div>

      <!-- <div class="header-banner" >
        <div class="banner-content">
          <p class="banner-title">
            Join us and be part of our network
          </p>
          <p class="banner-description">
            Earn cash by taking selfies, posting, getting likes, earning points, and redeeming prizes.
          </p>
        </div>
        <div class="banner-buttons">
          <button class="btn btn-primary btn-join" onclick="window.location.href = 'app'">Join now</button>
        </div>
        <div class="banner-scroll">
          <a href="#what-selfplix-can-do-section-id"><i class="fa fa-angle-down"></i></a>
        </div>
      </div> -->
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

  <script type="text/javascript">
    $('a').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 500);
            return false;
          }
        }
      });
  </script>

</html>