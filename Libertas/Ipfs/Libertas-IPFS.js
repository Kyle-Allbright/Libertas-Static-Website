    /* Libertas */
	
	(async () => {
      if (window.ipfs === undefined) {
        const repoPath = 'ipfs-' + Math.random()
        const node = await Ipfs.create({
          repo: repoPath
        })
        handleInit(node)
      } else {
        window.ipfs.enable().then(handleInit)
      }

	  /* Handle Init */
      function handleInit(node) {
        const testhash = "QmXKqNB7b3pb4TbRbALuS2hkzDidqocDY6pXMaEGddLp3D";
        Hls.DefaultConfig.loader = HlsjsIpfsLoader;
        Hls.DefaultConfig.debug = false;
        if (Hls.isSupported()) {
          const audio = document.getElementById('audio');
          const hls = new Hls();
          hls.config.ipfs = node;
          hls.config.ipfsHash = testhash;
          hls.loadSource('master.m3u8');
          hls.attachMedia(audio);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            audio.play();
          });
        }
      }
    })()