// gameover.js
score1 = 0;
score2 = 0;
score3 = 0;
audioEngine = cc.audioEngine;

var gameover = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();
    if (!audioEngine.isMusicPlaying()) {
      audioEngine.playMusic(res.bgm, true);
    }

    var over_back = new cc.Sprite(res.title_bg_png);
    over_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var over_back_layer = cc.Layer.create();
    over_back_layer.addChild(over_back);
    this.addChild(over_back_layer);

    var over_label = new cc.Sprite(res.gameover_png);
    over_label.setPosition(cc.p(size.width * 0.5, size.height * 0.8));
    var over_label_layer = cc.Layer.create();
    over_label_layer.addChild(over_label);
    this.addChild(over_label_layer);

    // タップイベントリスナー登録
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: this.onTouchBegan,
      onTouchMoved: this.onTouchMoved,
      onTouchEnded: this.onTouchEnded
    }, this);
    return true;
  },
  onTouchBegan: function(touch, event){
    return true;
  },
  onTouchMoved: function(touch, event){},
  onTouchEnded: function(touch, event){
    audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
    audioEngine.playEffect(res.se_button);
    cc.director.runScene(new titleScene());
  },
});

var overScene = cc.Scene.extend({
  onEnter: function(){
    this._super();

    var overlayer = new gameover();
    this.addChild(overlayer);
  }
});
