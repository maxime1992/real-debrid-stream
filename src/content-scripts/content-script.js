(function () {
	var hosts = ['1fichier', '24uploading', '2shared', '4shared', 'allmyvideos', 'anafile', 'canalplus', 'cbs', 'clicknupload', 'divxstage', 'dailymotion', 'datafilehost', 'dateito', 'depfile', 'free', 'easybytez', 'exashare', 'extmatrix', 'faststore', 'filef', 'fileflyer', 'filerio', 'filesflash', 'gigapeta', 'hugefiles', 'hulkshare', 'kingfiles', 'letitbit', 'loadto', 'mediafire', 'mega', 'megashares', 'movshare', 'novamov', 'nowdownload', 'nowvideo', 'oboom', 'openload', 'ozofiles', 'purevid', 'skyfm', 'rapidgator', 'rarefile', 'rutuberu', 'salefiles', 'scribd', 'secureupload', 'sendspace', 'shareflare', 'soundcloud', 'speedyshare', 'thevideo', 'turbobit', 'tusfiles', 'uloz', 'unibytes', 'uplea', 'uploadaf', 'uploadable', 'uploadc', 'ulto', 'uploadrocket', 'uploadx', 'uptobox', 'userscloud', 'videoweed', 'vimeo', 'vipfile', 'wat', 'youtube', 'youwatch', 'yunfile', 'zippyshare'];

	var linksGenerated = hosts.map(function(host) { return 'a[href*="'+host+'"]'; }).join(',');

	// select only links to debrid
	var links = $(linksGenerated);

	function proposeDebrid() {
		for (var i=0; i<links.length; i++) {
			console.log($(links[i]).attr('href'));
      transformLinkToButton($(links[i]), i);
		}
	}

  function transformLinkToButton(link, index) {
		link.wrap('<div></div>');
    link.parent().append('\
			<button id="btn-content-script-stream-' + index + '" type="button" class="btn btn-primary-outline">Stream</button>\
      '
    );

		$('#btn-content-script-stream-' + index).on('click', function() {

		});
  }

	proposeDebrid();
})();
