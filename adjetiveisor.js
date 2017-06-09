const adjetiveisor = (function() {

  // Properties:
  let maleSingular;
  let malePlural;
  let femaleSingular;
  let femalePlural;

  function setConfig(config) {
    if (typeof config !== undefined && typeof config.ms === 'string' && typeof config.mp === 'string' && typeof config.fs === 'string' && typeof config.fp === 'string') {
      maleSingular = config.ms;
      malePlural = config.mp;
      femaleSingular = config.fs;
      femalePlural = config.fp;
      return true;
    } else {
      return false;
    }
  }

  return {
    config: (config) => {
      return setConfig(config);
    }

  }
})();

module.exports = adjetiveisor;