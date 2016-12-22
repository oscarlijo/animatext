(function() {
  var client, clipPathSelect, widthSVG;

  $('.animateTitle1').animatext({
    speed: 300,
    effect: 'flipInY',
    reverse: true,
    onSuccess: function() {
      return $('.animateTitle2').animatext({
        speed: 150,
        effect: 'rollIn'
      });
    }
  });

  $('.sectionTitle h2').animatext({
    speed: 200,
    effect: 'tada'
  });

  $('.modetxt1').animatext({
    mode: 'chars',
    speed: 150,
    effect: 'flipInX',
    infinite: true
  });

  $('.modetxt2').animatext({
    mode: 'words',
    speed: 300,
    effect: 'flipInX',
    infinite: true
  });

  $('.grouptxt').animatext({
    group: true,
    speed: 200,
    effect: 'rubberBand',
    infinite: true,
    timeToRelaunch: 4000
  });

  $('.speedtxt1').animatext({
    speed: 100,
    effect: 'bounceIn',
    infinite: true
  });

  $('.speedtxt2').animatext({
    speed: 500,
    effect: 'bounceIn',
    infinite: true
  });

  $('.speedtxt3').animatext({
    speed: 1000,
    effect: 'bounceIn',
    infinite: true
  });

  $('.reversetxt1').animatext({
    speed: 300,
    effect: 'tada',
    reverse: true,
    infinite: true
  });

  $('.reversetxt2').animatext({
    speed: 300,
    effect: 'tada',
    reverse: false,
    infinite: true
  });

  $('.infinitetxt1').animatext({
    speed: 300,
    effect: 'rotateIn',
    infinite: true
  });

  $('.infinitetxt2').animatext({
    speed: 300,
    effect: 'rotateIn',
    infinite: false
  });

  $('.infinitetmr1').animatext({
    speed: 200,
    infinite: true,
    timeToRelaunch: 0
  });

  $('.infinitetmr2').animatext({
    speed: 200,
    infinite: true,
    timeToRelaunch: 3000
  });

  $('.initdelaytxt1').animatext({
    speed: 200,
    infinite: true,
    initDelay: 0
  });

  $('.initdelaytxt2').animatext({
    speed: 200,
    infinite: true,
    initDelay: 5000
  });

  $('.sloganAnimatext').animatext({
    speed: 70,
    effect: 'lightSpeedIn'
  });

  client = new ZeroClipboard($('.btn-clipboard'));

  client.on('aftercopy', function(event) {});

  $(document).ready(function() {
    $('pre code').each(function(i, block) {
      return hljs.highlightBlock(block);
    });
  });

  widthSVG = $(document).width();

  $('.header').prepend("<svg id='svgSectionTitle1' height='0' width='0'>\n  <defs>\n    <clipPath id='cross1'>\n      <path d='M" + (widthSVG / 7) + " 0 L" + (widthSVG / 2) + " " + (widthSVG / 5) + " L" + (widthSVG - (widthSVG / 7)) + " 0 Z'/>\n    </clipPath>\n  </defs>\n</svg>\n<svg id='svgSectionTitle2' height='0' width='0'>\n  <defs>\n    <clipPath id='cross2'>\n      <path d='M" + (widthSVG / 9) + " 0 L" + (widthSVG / 4) + " " + (widthSVG / 5) + " L" + (widthSVG - (widthSVG / 9)) + " " + (widthSVG / 12) + " Z'/>\n    </clipPath>\n  </defs>\n</svg>\n<svg id='svgSectionTitle3' height='0' width='0'>\n  <defs>\n    <clipPath id='cross3'>\n      <path d='M" + (widthSVG / 8) + " " + (widthSVG / 12) + " L" + (widthSVG / 1.5) + " " + (widthSVG / 5) + " L" + (widthSVG - (widthSVG / 6)) + " 0 Z'/>\n    </clipPath>\n  </defs>\n</svg>");

  $('.sectionTitle').height(widthSVG / 5);

  clipPathSelect = document.getElementById('clipPath');

  document.getElementById('clipped1').style.clipPath = 'url(#cross1)';

  document.getElementById('clipped2').style.clipPath = 'url(#cross2)';

  document.getElementById('clipped3').style.clipPath = 'url(#cross3)';

}).call(this);
