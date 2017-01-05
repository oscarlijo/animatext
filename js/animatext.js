(function() {
  (function($) {
    return $.fn.animatext = function(options) {
      var animaText, settings;
      settings = $.extend({
        group: false,
        mode: "chars",
        initDelay: 0,
        speed: 200,
        timeToRelaunch: 2000,
        reverse: false,
        infinite: false,
        random: false,
        onBegin: function() {},
        onSuccess: function() {}
      }, options);
      animaText = function(element) {
        var animatedElements, animatedElementsBuffer, animatedWords, animationInProgress, checkInView, cutText, doAnimation, j, paragraphs, randomIndex, randomIterations, ref, relaunchAnimation, scale;
        settings.onBegin();
        animatedElements = [];
        animationInProgress = false;
        if (settings.group) {
          $(element).each(function(i, item) {
            $(item).css('visibility', 'hidden');
            return animatedElements.push(item);
          });
        } else {
          paragraphs = "";
          cutText = element.html().split("<br>");
          $(cutText).each(function(i, item) {
            var cutParagraphs, words;
            words = "";
            cutParagraphs = item.split(" ");
            $(cutParagraphs).each(function(i, item) {
              var chars, cutWord;
              if (settings.mode === "chars") {
                chars = "";
                cutWord = item.split("");
                $(cutWord).each(function(i, item) {
                  return chars += '<span class="char' + (i + 1) + '" aria-hidden="true" style="visibility:hidden; display:inline-block">' + item + '</span>';
                });
                return words += '<span class="word' + (i + 1) + '" aria-hidden="true" aria-label="' + item + '" style="display:inline-block">' + chars + '</span> ';
              } else {
                return words += '<span class="word' + (i + 1) + '" aria-hidden="true" style="visibility:hidden; display:inline-block">' + item + '</span> ';
              }
            });
            return paragraphs += '<span class="paragraph' + (i + 1) + '" aria-hidden="true" aria-label="' + item + '" style="display:inline-block">' + words + '</span><br>';
          });
          element.attr('aria-label', element.text());
          element.html(paragraphs);
          animatedWords = element.find("span[class^='word']");
          if (settings.mode === "chars") {
            $(animatedWords).each(function(i, item) {
              var thisChars;
              thisChars = $(item).find("span[class^='char']");
              return $(thisChars).each(function(i, item) {
                return animatedElements.push(item);
              });
            });
          } else {
            $(animatedWords).each(function(i, item) {
              return animatedElements.push(item);
            });
          }
        }
        if (settings.reverse && !settings.random) {
          animatedElements.reverse();
        }
        if (settings.random) {
          animatedElementsBuffer = [];
          randomIterations = animatedElements.length;
          for (scale = j = ref = randomIterations; ref <= 1 ? j <= 1 : j >= 1; scale = ref <= 1 ? ++j : --j) {
            randomIndex = Math.floor(Math.random() * animatedElements.length);
            animatedElementsBuffer.push(animatedElements[randomIndex]);
            animatedElements.splice(randomIndex, 1);
          }
          animatedElements = animatedElementsBuffer;
        }
        relaunchAnimation = function(element) {
          if (settings.group) {
            $(element).each(function(i, item) {
              $(item).css('visibility', 'hidden');
              $(item).removeClass('animated');
              return $(item).removeClass(settings.effect);
            });
          } else {
            element.find("span").css('visibility', 'hidden');
            element.find("span").removeClass('animated');
            element.find("span").removeClass(settings.effect);
          }
          return doAnimation();
        };
        doAnimation = function() {
          var animation, indexInterval;
          animationInProgress = true;
          indexInterval = 0;
          return animation = setInterval(function() {
            if (indexInterval >= animatedElements.length) {
              clearInterval(animation);
              settings.onSuccess();
              if (settings.infinite) {
                setTimeout(function() {
                  animationInProgress = false;
                  return relaunchAnimation(element);
                }, settings.timeToRelaunch);
              }
            }
            $(animatedElements[indexInterval]).css('visibility', 'visible');
            if (settings.effect) {
              $(animatedElements[indexInterval]).addClass('animated ' + settings.effect);
            }
            return indexInterval += 1;
          }, settings.speed);
        };
        checkInView = function(element) {
          var bounds, elementInView, viewport, win;
          element = $(element);
          win = $(window);
          viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
          };
          viewport.right = viewport.left + win.width();
          viewport.bottom = viewport.top + win.height();
          bounds = element.offset();
          bounds.right = bounds.left + element.width();
          bounds.bottom = bounds.top + element.height();
          elementInView = !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
          if (elementInView && !animationInProgress) {
            return doAnimation();
          }
        };
        $(window).on("resize scroll", function() {
          return checkInView(element);
        });
        return $(document).ready(function() {
          return setTimeout(function() {
            return checkInView(element);
          }, settings.initDelay);
        });
      };
      if (this.length > 0) {
        if (settings.group) {
          return animaText(this);
        } else {
          return $(this).each(function(i, item) {
            return animaText($(item));
          });
        }
      }
    };
  })(window.jQuery || window.Zepto || window.$);

}).call(this);
