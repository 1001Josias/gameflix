setup()

async function setup(){
   const games = await fetchApi('../games.json')
   $(document).ready(()=>{
      $('.games-carousel').slick({
         infinite: true,
         slidesToShow: 5,
         slidesToScroll: 5,
         focusOnSelect:true,
         responsive: [
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true                
              }
            }
          ]
       })
       let gamePlatform = 'PS2'
       setInitialGame(games, gamePlatform)
       addAllImagesnCarolsel(games,gamePlatform)
       
       createPlayer()
       
       $('.game-item').on('hover',(event)=>{
         let game = event.target
            console.log(game.getAttribute('data-trailer'))
            setTitle(game.alt)
            setDescription(game.getAttribute('data-sinopse'))
            setBackgroudBanner(game.getAttribute('data-banner'))
            setUrlVideoInButton('button-trailer', game.getAttribute('data-trailer'))
            setUrlVideoInButton('button-playlist', game.getAttribute('data-playlist'))
         })
         
        $('#button-trailer').on('click',(event)=> {
         setPlayerSize('iframePlayer', 440, 300)
         setUrlVideoInPlayer('iframePlayer',event.target.getAttribute('data-video-url'))
         })

        $('#button-playlist').on('click',(event)=> {
         setPlayerSize('iframePlayer', 440, 300)
           setUrlVideoInPlayer('iframePlayer',event.target.getAttribute('data-video-url'))
        })
   })
   
   function setInitialGame(games, gamePlatform){
      let lastGameInApi = games[gamePlatform][games[gamePlatform].length - 1]
      setDescription(lastGameInApi.description)
      setTitle(lastGameInApi.title)
      setBackgroudBanner(lastGameInApi.banner)
      setUrlVideoInButton('button-trailer', lastGameInApi.trailer)
      setUrlVideoInButton('button-playlist', lastGameInApi.playlist)
   }

   function setUrlVideoInButton(idButton, urlVideo){
      $(`#${idButton}`)
      .attr('data-video-url',urlVideo)
   }

   function setUrlVideoInPlayer(idIframe, urlVideo){
      $(`#${idIframe}`)
      .attr('src',urlVideo)
   }

   function setBackgroudBanner(banner){
      $('.main-game')
      .css('background-image',`linear-gradient(rgba(0,0,0, .60),rgba(0,0,0, .60)100%), url('${banner}')`)
   }

   function setDescription(description){
      $('.description').text(description)
   }

   function setPlayerSize(idIframe, width, height){
      $(`#${idIframe}`)
      .width(width)
      .height(height)
   }

   function setTitle(title){
      $('.title').text(title)
   }
   
   async function addAllImagesnCarolsel(games, gamePlatform){
      console.log("Retorno api", games[gamePlatform])
      for(let game of games[gamePlatform]){
         let imageTag = createImage(game)
         addImageInCarousel(imageTag)
      }
   }

   async function fetchApi(url){
      const response = await fetch(url)
      return await response.json()
   }
   
   function createImage(game){
      const imageTag = document.createElement("img")
      imageTag.setAttribute('class','game-item')
      imageTag.setAttribute('id', game.id)
      imageTag.setAttribute('data-sinopse',game.description)
      imageTag.setAttribute('data-banner',game.banner)
      imageTag.setAttribute('data-trailer', game.trailer)
      imageTag.setAttribute('data-playlist', game.playlist)
      imageTag.src = game.image
      imageTag.alt = game.name
      return imageTag
   }
   
   function createPlayer(){
      let playerDiv = document.querySelector('#player')
      let iframe = document.createElement('iframe')
      iframe.setAttribute('id','iframePlayer')
      iframe.setAttribute('title', 'YouTube video player')
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
      iframe.width = 0
      iframe.height = 0
      iframe.border = 0
      iframe.setAttribute('frameborder', '0')
      iframe.allowFullscreen
      playerDiv.appendChild(iframe)
   }

   function addImageInCarousel(imageTag){
         $('.games-carousel').slick('slickAdd',imageTag)
   }
}