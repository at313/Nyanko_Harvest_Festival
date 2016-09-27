// rank.js

var back_label;
var backBox;
var back_flg;

audioEngine = cc.audioEngine;

var ranking = cc.Layer.extend({
  ctor: function(){
    this._super();
    var size = cc.director.getWinSize();
    if (!audioEngine.isMusicPlaying()) {
      audioEngine.playMusic(res.bgm, true);
    }
    var rank_background = new cc.Sprite(res.title_bg_png);
    rank_background.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var rank_background_layer = cc.Layer.create();
    rank_background_layer.addChild(rank_background);
    this.addChild(rank_background_layer);

    var rank_back = new cc.Sprite(res.ranking_bg_png);
    rank_back.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
    var rank_back_layer = cc.Layer.create();
    rank_back_layer.addChild(rank_back);
    this.addChild(rank_back_layer);

    back_label = new cc.Sprite(res.ranking_back0_png);
    back_label.setTag(4);
    back_label.setPosition(cc.p(size.width * 0.08, size.height * 0.08));
    this.addChild(back_label);

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
    backBox = back_label.getBoundingBox();
    if (cc.rectContainsPoint(backBox, touch.getLocation())){
      back_label.setTexture(res.ranking_back1_png);
      back_flg = true;
    }
    return true;
  },
  onTouchMoved: function(touch, event){},
  onTouchEnded: function(touch, event){
    if(back_flg){
      back_flg = false;
      audioEngine.setEffectsVolume(audioEngine.getEffectsVolume() + 0.3);
      audioEngine.playEffect(res.se_button);
      cc.director.runScene(new titleScene());
    }
  },
});

var rankingScene = cc.Scene.extend({
  onEnter: function(){
    this._super();

    var ranklayer = new ranking();
    this.addChild(ranklayer);
  }
});
