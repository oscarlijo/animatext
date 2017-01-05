(($) ->
    $.fn.animatext = (options) ->
        # Default options
        settings = $.extend(
            group: false
            mode: "chars"
            initDelay: 0
            speed: 200
            timeToRelaunch: 2000
            reverse: false
            infinite: false
            random: false
            onBegin: () ->
            onSuccess: () ->
        , options )


        # Main function
        animaText = (element) ->
          settings.onBegin()
          animatedElements = []
          animationInProgress = false

          if settings.group
            $(element).each (i, item) ->
              $(item).css 'visibility', 'hidden'
              animatedElements.push(item)
          else
            paragraphs = ""
            cutText = element.html().split("<br>")
            $(cutText).each (i, item) ->
              words = ""
              cutParagraphs = item.split(" ")
              $(cutParagraphs).each (i, item) ->
                if settings.mode is "chars"
                  chars = ""
                  cutWord = item.split("")
                  $(cutWord).each (i, item) ->
                    chars += '<span class="char'+(i+1)+'" aria-hidden="true" style="visibility:hidden; display:inline-block">'+item+'</span>'
                  words += '<span class="word'+(i+1)+'" aria-hidden="true" aria-label="'+item+'" style="display:inline-block">'+chars+'</span> '
                else
                  words += '<span class="word'+(i+1)+'" aria-hidden="true" style="visibility:hidden; display:inline-block">'+item+'</span> '
              paragraphs += '<span class="paragraph'+(i+1)+'" aria-hidden="true" aria-label="'+item+'" style="display:inline-block">'+words+'</span><br>'
            element.attr 'aria-label', element.text()
            element.html paragraphs

            animatedWords = element.find "span[class^='word']"

            if settings.mode is "chars"
              $(animatedWords).each (i, item) ->
                thisChars = $(item).find "span[class^='char']"
                $(thisChars).each (i, item) ->
                  animatedElements.push(item)
            else
              $(animatedWords).each (i, item) ->
                animatedElements.push(item)


          if settings.reverse and !settings.random
            animatedElements.reverse()

          if settings.random
            animatedElementsBuffer = []
            randomIterations = animatedElements.length
            for scale in [randomIterations..1]
              randomIndex = Math.floor(Math.random() * animatedElements.length)
              animatedElementsBuffer.push animatedElements[randomIndex]
              animatedElements.splice randomIndex, 1
            animatedElements = animatedElementsBuffer


          # Re-launch the animation
          relaunchAnimation = (element) ->
            if settings.group
              $(element).each (i, item) ->
                $(item).css 'visibility', 'hidden'
                $(item).removeClass 'animated'
                $(item).removeClass settings.effect
            else
              element.find("span").css 'visibility', 'hidden'
              element.find("span").removeClass 'animated'
              element.find("span").removeClass settings.effect
            doAnimation()

          # Do the animation
          doAnimation = ()->
            animationInProgress = true
            indexInterval = 0
            animation = setInterval( ->
                if indexInterval >= animatedElements.length
                  clearInterval(animation)
                  settings.onSuccess()
                  if settings.infinite
                    setTimeout(()->
                      animationInProgress = false
                      relaunchAnimation(element)
                    , settings.timeToRelaunch)

                $(animatedElements[indexInterval]).css 'visibility', 'visible'
                if settings.effect
                  $(animatedElements[indexInterval]).addClass 'animated ' + settings.effect
                indexInterval += 1
            , settings.speed)


          # Make sure the element is in the viewport
          checkInView = (element) ->
            element = $(element)
            win = $(window)
            viewport = {
                top : win.scrollTop()
                left : win.scrollLeft()
            }
            viewport.right = viewport.left + win.width()
            viewport.bottom = viewport.top + win.height()
            bounds = element.offset()
            bounds.right = bounds.left + element.width()
            bounds.bottom = bounds.top + element.height()

            elementInView = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom))

            if elementInView && !animationInProgress
              doAnimation()

          $(window).on "resize scroll", () ->
            checkInView(element)
          $(document).ready ->
            setTimeout(()->
              checkInView(element)
            , settings.initDelay)

        # Create Instances ----------------
        if @.length > 0
          if settings.group
            animaText(@)
          else
            $(@).each (i, item) ->
              animaText($(item))

)(window.jQuery || window.Zepto || window.$)
