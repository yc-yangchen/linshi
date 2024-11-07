(function (d, params, env, apiHost, hosts) {
  params = {
    fg_aid: "A1000-1",
    fg_beat: "371",
    fg_domain: "play.famobi.com",
    fg_pid: "4638e320-4444-4514-81c4-d80a8c662371",
    fg_uid: "56b693d4-476b-472b-a1ed-25cc7cabbd09",
    original_ref: "https://games.famobi.com/",
  };
  env = "prod";
  apiHost = "api";
  // load script
  (function (d, url, fgJS, firstJS) {
    fgJS = d.createElement("script");
    firstJS = d.getElementsByTagName("script")[0];
    fgJS.src =
      url + "?_location=" + encodeURIComponent(d.location.href.split("#")[0]);
    firstJS.parentNode.insertBefore(fgJS, firstJS);
  })(
    d,
      "./" +
      apiHost +
      ".famobi.com/gameapi/script/" +
      params.fg_uid +
      "/" +
      params.fg_pid
  );
})(document, {}, "", "", {
  dev: "api.dev",
  staging: "api.staging.gc",
  "staging.aws": "api.staging.aws",
  "staging.gc": "api.staging.gc",
  prod: "api",
});
