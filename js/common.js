/***********************************************************
    [EasyTalk] (C)2009 - 2011 nextsns.com
    This is NOT a freeware, use is subject to license terms

    @Filename common.js $

    @Author hjoeson $

    @Date 2011-01-09 08:45:20 $
 *************************************************************/

var autoupdateid;
var etobj=jQuery.parseJSON(etuser);
var setok=etobj.setok;
var siteurl=etobj.siteurl;
var pubdir=etobj.pubdir;
var my_uid=etobj.my_uid;
var user_name=etobj.user_name;
var nickname=etobj.nickname;
var space=etobj.space;
var mPosition = 0;
var confirmMark = new String();
var wblayertimeid;
var emoArray = new Array("(发呆)", "(可爱)", "(大笑)", "(呲牙)", "(偷笑)", "(发怒)", "(纠结)", "(饥饿)", "(流泪)", "(调皮)", "(晕)", "(流汗)", "(困)", "(撇嘴)", "(惊恐)", "(憨笑)", "(动心)", "(酷)", "(骷髅)", "(快哭了)", "(睡觉)", "(调皮)", "(亲亲)", "(疑问)", "(闭嘴)", "(委屈)", "(眯眼)", "(奋斗)", "(鄙视)", "(猪头)", "(色)");

var is_send = false;

$(document).ready(function(){
    //$("#main").height(parseInt($("#columns").height())-36);

	/*input num*/


//    var contentboxchange = function(){
//        $('#contentbox').removeClass('hgrey');
//        var len=$.trim($('#contentbox').val()).length;
//        len=140-len;
//        if (len<0) {
//            $('#contentbox').val($.trim($('#contentbox').val()).slice(0,140));
//            len=0;
//        }
//        $('#nums').html(len);
//    };

    var contentboxchange = function(){
        $('#contentbox').removeClass('hgrey');
        var len=$.trim($('#contentbox').val()).length;
        len = 140 - len;
        if ( len < 0 ) {
            //$('#contentbox').val($.trim($('#contentbox').val()).slice(0,140));
        	is_send = false;
           $("#issuestr").html("已经超过<span id='nums' style='color:red'>1</span>字");
        }else{
        	is_send = true;
        	$("#issuestr").html("还能输入<span id='nums'>1</span>字");
        }
        $('#nums').html(Math.abs(len));
    };
    var taboffLength = $('.indexh .taboff').length;
	$('.indexh .taboff').eq(taboffLength -1).css('background','none');
	$('.indexh .tabon').prev().css('background','none');
    $("#contentbox").keyup(contentboxchange);
    $("#contentbox").bind('input',contentboxchange);
    /*hometabs*/
    $(".homestabs > .menu: li").mouseover(function(){
        $(this).find('b').addClass("arrHover");
    });
    $(".homestabs > .menu: li").mouseout(function(){
        $(this).find('b').removeClass("arrHover");
    });
    $(window).scroll(function(){
        if ($(window).scrollTop()>0) {
            $(".gotop").fadeIn("fast");
        } else {
            $(".gotop").fadeOut("fast");
        }
    });

    $("a").focus(function(){
        this.blur()
    });
    $("input:button").focus(function(){
        this.blur()
    });
    //Tips();
    //Followpreview();
    $('#lookmore').change(function(){
        var conttype=$(this).val();
        if (space) {
            window.location.href=siteurl+'/'+user_name+'/'+space+'/'+conttype;
        } else {
            window.location.href=siteurl+'/'+user_name+'/'+conttype;
        }
    });
    $('#topcity').change(function(){
        var topcity=$(this).val();
        window.location.href=siteurl+'/Hot?c='+topcity;
    });
    $("#mytopic li").mouseover(function(){
        $(this).find('.num').show();
    });
    $("#mytopic li").mouseout(function(){
        $(this).find('.num').hide();
    });
    $('.video').click(function(){
        $('#sharephoto').hide();
        $('#sharevideo').show()
        $('#sharemusic').hide();
    });
    //$('.video').mouseout(function(){
    //    $('#sharevideo').hide();
    //});
    $('#closevideo').click(function(){
        $('#sharevideo').hide('fast');
    });

    //上传链接
    $('#uploadvideourl').click(function(){
    	if($('input[name="videourl"]').val() == '')
    		{
    			alert('视频地址不能为空');
    		}
    	$.ajax({
    		url:siteurl+'/space/videourl',
    		data:{videourl:$('input[name="videourl"]').val()},
    		dataType:'json',
    		type:'POST',
    		success:function(data){
    			if(data.status == 1)
    				{
    					//视频正确，将短链接放到信息框中
    					$('#contentbox').val($('#contentbox').val()+' '+data.shorturl+' ');
    					$('#sharevideo').hide('fast');
    					$('#videoa').addClass('disabled');
    					$('.video').unbind();
    				}else if(data.status == 0)
					{
    					//视频无法解析
    					$('p[node-type="errorWord"]').show();
					}

    		}
    	});
    });

    $('#uploadmusic').click(function(){
    	//上传音频
    	 $('#sharephoto').hide();
         $('#sharevideo').hide();
         $('#sharemusic').show();
    });

    $('.photo').click(function(){
        $('#sharephoto').show();
        $('.video #sharevideo').hide();
        $('#sharemusic').hide();
    });
    $('#closephoto').click(function(){
        $('#sharephoto').hide('fast');
    });
    $('#uploadbtn').change(function(){
        uploadpic($(this).val());
    });
    /*pic rot*/
    $('body').append('<div class="wyzshover"></div>')
    $('.wyzshover')	.hide();
    picctrl();
    //wyzshover();
	//v认证
	if($('.nc_user .vip_big').length>0){
		$('body').append('<div id="vipTips">记者认证<br /><span></span></div>');
	}
	var tit;
	$('.nc_user .vip_big').mouseover(function(){
		tit = $(this).attr('title');
		var ei = $('#vipTips');
		ei.show();
		ei.find('span').html(tit);
        var t = $(this).offset().top+20;
        var l = $(this).offset().left;
        ei.css({
            'top':t,
            'left':l,
            'display':'block',
            'position':'absolute'
        });
		$('.nc_user .vip_big').mouseout(function(){
			$('#vipTips').hide();
		});
	});
	//shouqi

	/*wblayer*/
    wblayeract();
    sidelay();
});



function hideMedia(id){
	$("#flash_div_"+id).parent().siblings('.imageshow').show();
	$("#flash_div_"+id).parent().removeAttr('style');
	$("#flash_div_"+id).remove();
	$("#img_"+id).css("display","block");
	return false;
}
function unicode(s){
    var len=s.length;
    var rs="";
    for(var i=0;i<len;i++){
        var k=s.substring(i,i+1);
        rs+= (i==0?"":",")+s.charCodeAt(i);
    }
    return rs;
}
function runicode(s){
    var k=s.split(",");
    var rs="";
    for(i=0;i<k.length;i++){
        rs+=String.fromCharCode(k[i]);
    }
    return rs;
}
//function tologin(){
//    if (!my_uid) {
//        location.href=siteurl+'/';
//        return;
//    }
//}
function tologin(){
    if (!my_uid) {
     	  dialog("","url:get?"+siteurl+"/ajax_login","277px","223px","text");
		return false;
    }else{
		return true;
	}

}



//function picctrl(){
//    $(".imageshow > .miniImg").bind('click',function(){
//        $(this).hide();
//        var src = $(this).parent().find('.artZoomBox .maxImg').attr('src');
//        var maxImgParent = $(this).parent().find('.artZoomBox .maxImg').parent();
//        maxImgParent.empty();
//        maxImgParent.append('<img class="maxImg" onerror="this.src=\'http://vnews.caixin.cn/Public/images/noavatar.jpg\'" src="'+src+'" />');
//
//        $(this).parent().find('.artZoomBox').show();
//		$(this).parent().parent().find('.media').hide();
//    });
//    $(".imageshow").find('.maxImgLink').bind('click',function(){
//        $(this).parent().parent().find('.miniImg').show();
//        $(this).parent().hide();
//		$(this).parent().parent().parent().find('.media').show();
//    });
//    $(".imageshow").find('.hideImg').bind('click',function(){
//        $(this).parent().parent().parent().find('.miniImg').show();
//        $(this).parent().parent().hide();
//		$(this).parent().parent().parent().parent().find('.media').show();
//    });
//    $(".imageshow").find('.imgRight').bind('click',function(){
//        $(this).parent().parent().find('.maxImg').rotateRight(90);
//    });
//    $(".imageshow").find('.imgLeft').bind('click',function(){
//        $(this).parent().parent().find('.maxImg').rotateLeft(90);
//    });
//}

function picctrl(){
    $(".imageshow > .miniImg").live('click',function(){
        $(this).hide();
        $(this).parent().find('.artZoomBox').show();
    });
    $(".imageshow").find('.maxImgLink').live('click',function(){
        $(this).parent().parent().find('.miniImg').show();
        $(this).parent().hide();
    });
    $(".imageshow").find('.hideImg').live('click',function(){
        $(this).parent().parent().parent().find('.miniImg').show();
        $(this).parent().parent().hide();
    });
    $(".imageshow").find('.imgRight').live('click',function(){
        $(this).parent().parent().find('.maxImg').rotateRight(90);
    });
    $(".imageshow").find('.imgLeft').live('click',function(){
        $(this).parent().parent().find('.maxImg').rotateLeft(90);
    });
}
/*emotion*/
function closetip(id) {
    $("#"+id).remove();
    if ($('.tipmsg > .tips > p').length<=0) {
        $(".tipmsg").remove();
    }
}
function showemotion(em,pid) {
    $("#"+em).html('<div class="emotions"><ul class="emotion"><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(发呆)\')"><img alt="发呆" title="发呆" src="'+pubdir+'/images/comcom/1.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(可爱)\')"><img alt="可爱" title="可爱" src="'+pubdir+'/images/comcom/2.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(大笑)\')"><img alt="大笑" title="大笑" src="'+pubdir+'/images/comcom/3.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(呲牙)\')"><img alt="呲牙" title="呲牙" src="'+pubdir+'/images/comcom/4.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(偷笑)\')"><img alt="偷笑" title="偷笑" src="'+pubdir+'/images/comcom/5.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(发怒)\')"><img alt="发怒" title="发怒" src="'+pubdir+'/images/comcom/6.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(纠结)\')"><img alt="纠结" title="纠结" src="'+pubdir+'/images/comcom/7.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(饥饿)\')"><img alt="饥饿" title="饥饿" src="'+pubdir+'/images/comcom/8.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(流泪)\')"><img alt="流泪" title="流泪" src="'+pubdir+'/images/comcom/9.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(调皮)\')"><img alt="调皮" title="调皮" src="'+pubdir+'/images/comcom/10.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(晕)\')"><img alt="晕" title="晕" src="'+pubdir+'/images/comcom/11.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(流汗)\')"><img alt="流汗" title="流汗" src="'+pubdir+'/images/comcom/12.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(困)\')"><img alt="困" title="困" src="'+pubdir+'/images/comcom/13.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(撇嘴)\')"><img alt="撇嘴" title="撇嘴" src="'+pubdir+'/images/comcom/14.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(惊恐)\')"><img alt="惊恐" title="惊恐" src="'+pubdir+'/images/comcom/15.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(憨笑)\')"><img alt="憨笑" title="憨笑" src="'+pubdir+'/images/comcom/16.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(动心)\')"><img alt="动心" title="动心" src="'+pubdir+'/images/comcom/17.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(酷)\')"><img alt="酷" title="酷" src="'+pubdir+'/images/comcom/18.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(骷髅)\')"><img alt="骷髅" title="骷髅" src="'+pubdir+'/images/comcom/19.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(快哭了)\')"><img alt="快哭了" title="快哭了" src="'+pubdir+'/images/comcom/20.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(睡觉)\')"><img alt="睡觉" title="睡觉" src="'+pubdir+'/images/comcom/21.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(调皮)\')"><img alt="调皮" title="调皮" src="'+pubdir+'/images/comcom/22.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(亲亲)\')"><img alt="亲亲" title="亲亲" src="'+pubdir+'/images/comcom/23.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(疑问)\')"><img alt="疑问" title="疑问" src="'+pubdir+'/images/comcom/24.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(闭嘴)\')"><img alt="闭嘴" title="闭嘴" src="'+pubdir+'/images/comcom/25.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(委屈)\')"><img alt="委屈" title="委屈" src="'+pubdir+'/images/comcom/26.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(眯眼)\')"><img alt="眯眼" title="眯眼" src="'+pubdir+'/images/comcom/27.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(奋斗)\')"><img alt="奋斗" title="奋斗" src="'+pubdir+'/images/comcom/28.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(鄙视)\')"><img alt="鄙视" title="鄙视" src="'+pubdir+'/images/comcom/29.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(猪头)\')"><img alt="猪头" title="猪头" src="'+pubdir+'/images/comcom/30.gif"/></a></li><li><a href="javascript:void(0);" onclick="emotion(\''+em+'\',\''+pid+'\',\'(色)\')"><img alt="色" title="色" src="'+pubdir+'/images/comcom/31.gif"/></a></li> </li><li> </li><li><a href="javascript:void(0);" onclick="closeemotion(\''+em+'\')">&nbsp;x&nbsp;</a></li></ul></div>');
    $("#"+em).show();
}
function emotion(em,id,emo) {
    var val = $("#"+id).val()+emo;

    if($.trim(val).length<140){
        $("#"+id).val($("#"+id).val()+emo);
        $("#"+id).trigger('keyup');
    }
    else {
        ye_msg.open('已超出140字！',1,2);
    }

    closeemotion(em);
}

function closeemotion(id) {
    $("#"+id).html('');
    $("#"+id).hide();
}
/*del msg*/
function delmsg(url,mes,obj,reurl) {
    if(!tologin())return false;
    var mymes;
    mymes=confirm(mes);
    if(mymes==true){
        $.ajax({
            type: "GET",
            url: url,
            success: function(msg){
                if (msg=="success") {
                    if (!reurl) {
						if($(obj.parentNode).find('.stampb').length>0){
							obj = obj.parentNode;
						}
                        $(obj).animate({
                            opacity: 'toggle'
                        }, "slow");
                        ye_msg.open('删除成功',1,1);

                        var replynumobj = $('#replynum_' + $(obj.parentNode).attr('replyid'));
                        if(replynumobj.length){
                            replynumobj.html(parseInt(replynumobj.html()) - 1);
                        }
                        if($('#cmtnum').length){
                            $('#cmtnum').html(parseInt($('#cmtnum').html()) - 1);
                        }
                        if($('#keynum').length){
                            $('#keynum').html(parseInt($('#keynum').html()) - 1);
                        }
                    } else {
                        location.href=reurl;
                        return;
                    }
                } else {
                    ye_msg.open(msg,3,2);
                }
            }
        });
    }
}
function delfavor(cid,url,mes,obj) {
    tologin();
    var mymes;
    mymes=confirm(mes);
    if(mymes==true){
        $.ajax({
            type: "GET",
            url: url,
            success: function(msg){
                if (msg=="success") {
                    ye_msg.open('删除成功',1,1);
                    if('favor' == space) {
                    	$(obj.parentNode).animate({
                            opacity: 'toggle'
                        }, "slow");
                    }else{
                    	$(obj).replaceWith('<a class="fav" href="javascript:void(0)" onclick="dofavor(\''+cid+'\',this)" title="添加到我的收藏">收藏</a>');
                    }

                } else {
                    ye_msg.open(msg,3,2);
                }
            }
        });
    }
}
function followop(url,mes,mes2,uid,unickname,status) {
    tologin();
//    alert(url);return false;
    var mymes;
    if (mes2=='gz') {
        mymes=true;
    }
    else {
        mymes=confirm(mes);
    }
    if(mymes==true){
        $.ajax({
            type: "GET",
            url: siteurl+'/Space/'+url+'/rand/'+GetRandomNum(1,999999),
            success: function(msg){
                if (msg=="success") {
                    if (mes2=='gz') {
                        ye_msg.open('收听成功',1,1);
                        if (parseInt(status)>=2) {
                            $('#followsp_'+uid).html("<span class='followbtn'><input type=\"button\" class=\"hxst\" value=\"互相收听\" />&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onclick=\"followop('delfollow/user_id/"+uid+"','确认要解除对 "+unickname+" 的收听吗？','jc','"+uid+"','"+unickname+"','"+status+"')\">取消收听</a></span>");
                        }
                        else {
                            $('#followsp_'+uid).html("<span class='followbtn'><input type=\"button\" class=\"hxst\" value=\"已收听\" />&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onclick=\"followop('delfollow/user_id/"+uid+"','确认要解除对 "+unickname+" 的收听吗？','jc','"+uid+"','"+unickname+"','"+status+"')\">取消收听</a></span>");
                        }
                    } else {
                        ye_msg.open('解除成功',1,1);
                        $('#followsp_'+uid).html("<span class='followbtn'><a class='bh' onclick=\"followop('addfollow/user_id/"+uid+"','','gz','"+uid+"','"+unickname+"','"+status+"')\">收听</a></span>");
                    }
                } else {
                    ye_msg.open(msg,3,2);
                }
            }
        });
    }
}
function followone(uid,e) {
    tologin();
    $.ajax({
        type: "GET",
        url: siteurl+'/Space/addfollow/user_id/'+uid+'/rank/'+GetRandomNum(1,999999),
        success: function(msg){
            if (msg=='success') {
                $(e).attr("class","yst");
                $(e).attr("onclick","");
                $(e).html('已收听');
            }
            else {
                ye_msg.open(msg,3,2);
            }
        }
    });
}
function followall(e) {
    tologin();
    var arrChk=$("input[name='flist'][checked]");
    var uidlist = '';
    $(arrChk).each(function(){ if(this.checked) uidlist+=this.value+','; });
//    alert(uidlist);
//    return false;
    $.ajax({
        type: "GET",
        url: siteurl+'/Space/followall/user_id/'+uidlist+'/rank/'+GetRandomNum(1,999999),
        success: function(msg){
            if (msg=='success') {
                $(e).attr("class","yst");
                $(e).attr("onclick","");
                $(e).html('已收听');
            }
            else {
                ye_msg.open(msg,3,2);
            }
        }
    });
}
function selectfollowall(obj) {
	var arrChk=$("input[name='flist']");
	if(obj.checked) {
	    $(arrChk).each(function(){ this.checked=true; });
	}else{
	    $(arrChk).each(function(){ this.checked=false; });
	}
}
function fltopic(id,mes,op,obj) {
    tologin();
    var mymes;
    if (op=='fl') {
        mymes=true;
    }
    else {
        mymes=confirm(mes);
    }
    if(mymes==true){
        $.ajax({
            type: "GET",
            url: siteurl+'/Topic/follow/id/'+id+'/op/'+op+'/rand/'+GetRandomNum(1,999999),
            success: function(msg){
                if (msg=="success") {
                    if (op=='fl') {
                        ye_msg.open('成功关注该话题',1,1);
                        $('#followtopic').html("<a class='btn01' onclick=\"fltopic('"+id+"','确认要解除关注该话题？','jc')\">解除关注</a>");
                    } else {
                        ye_msg.open('成功解除关注该话题',1,1);
                        $('#followtopic').html("<a class='btn01' onclick=\"fltopic('"+id+"','','fl')\">关注话题</a>");
                        if (obj) {
                            $(obj).animate({
                                opacity: 'toggle'
                            }, "slow");
                        }
                    }
                }
                else {
                    ye_msg.open(msg,3,2);
                }
            }
        });
    }
}
function jsop(url,mes){
    tologin();
    var mymes=confirm(mes);
    if(mymes==true){
        window.location=url;
    }
}
function dofavor(id, obj){
    tologin();
    $.ajax({
        type: "GET",
        url: siteurl+'/Space/dofavor/cid/'+id+"/rank/"+GetRandomNum(1,999999),
        success: function(msg){
            if (msg=='success') {
                ye_msg.open('收藏成功',1,1);
                $(obj).replaceWith('<a class="fav" href="javascript:void(0)" onclick="delfavor('+ id + ',\'/Space/delfavor/cid/'+ id + '\',\'确实要删除此条收藏吗?\',this)" title="删除收藏">已收藏</a>');
            } else {
                ye_msg.open(msg,1,2);
            }
        }
    });
}

function docopy(id){
	copy_url(delHtmlTag(jQuery("#"+id).html()));
	//copy_code(jQuery("#"+id).html());
}
function delHtmlTag(str)
{
        return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
}

function copy_url(txt){
	var clipBoardContent=txt;
	//clipBoardContent+=document.title; //获取标题
	//clipBoardContent+="\n";
	//clipBoardContent+=this.location.href; //获取地址
	if (window.clipboardData){
	window.clipboardData.setData("Text", clipBoardContent);}
	else if (window.netscape){
	netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
	var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance

	(Components.interfaces.nsIClipboard);
	if (!clip) return;
	var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance

	(Components.interfaces.nsITransferable);
	if (!trans) return;
	trans.addDataFlavor('text/unicode');
	var str = new Object();
	var len = new Object();
	var str = Components.classes["@mozilla.org/supports-string;1"].createInstance

	(Components.interfaces.nsISupportsString);
	var copytext=clipBoardContent;
	str.data=copytext;
	trans.setTransferData("text/unicode",str,copytext.length*2);
	var clipid=Components.interfaces.nsIClipboard;
	if (!clip) return false;
	clip.setData(trans,null,clipid.kGlobalClipboard);}
	alert("复制成功");
	}

    function copyToClipboard(txt) {
         if(window.clipboardData) {
                 window.clipboardData.clearData();
                 window.clipboardData.setData("Text", txt);
         }  else if (window.netscape) {
              try {
                   netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
              } catch (e) {
                   alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
              }
              var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
              if (!clip)
                   return;
              var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
              if (!trans)
                   return;
              trans.addDataFlavor('text/unicode');
              var str = new Object();
              var len = new Object();
              var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
              var copytext = txt;
              str.data = copytext;
              trans.setTransferData("text/unicode",str,copytext.length*2);
              var clipid = Components.interfaces.nsIClipboard;
              if (!clip)
                   return false;
              clip.setData(trans,null,clipid.kGlobalClipboard);
              alert("复制成功！")
         }
    }






function isfun(val) {
    if (val=="#请在这里输入自定义话题#") {
        ye_msg.open('请输入要发表的话题',1,2);
        return false;
    } else if (val=="") {
        ye_msg.open('您没有填写发表的内容，请填写后发表！',1,2);
        return false;
    } else if (val.length>140)  {
        ye_msg.open('内容的长度不能大于140字符！',1,2);
        return false;
    }
    else {
        return true;
    }
}
function isfun2(funame,msg) {
    if (funame=="") {
        ye_msg.open('您还没有选择好友！',1,2);
        return false;
    }
    if (msg=="") {
        ye_msg.open('您没有填写发表的内容，请填写后发表！',1,2);
        return false;
    } else if (msg.length>140)  {
        ye_msg.open('信息的长度不能大于140字符！',1,2);
        return false;
    } else {
        return true;
    }
}
/*send msg start*/
function spnums(){
    var len=$.trim($("#pmcontentbox").val()).length;
    len=140-len;
    if (len<0) {
        $("#pmcontentbox").val($.trim($("#pmcontentbox").val()).slice(0,140));
        len=0;
    }
    $("#pnum").html(len);
}
function sendprimsgbox(funame) {
    tologin();
    var html;
    html ='<div id="pmessage"><table border="0" width="100%">';
    html+='<tr height="30px"><td width="50px">收信人</td><td><input type="text" class="input_text" id="senduser" style="width:195px"><span class="tip1">请输入你的听众的帐号</span></td></tr>';
    html+='<tr><td valign="top">内&nbsp;&nbsp;&nbsp;容</td><td><textarea onkeyup="spnums()" id="pmcontentbox" class="input_text" style="width:350px;height:70px;"></textarea></td></tr>';
    html+='<tr><td colspan="2"><p><span class="tip2">还能输入<em id="pnum">140</em>字</span><a href="javascript:void(0);" onclick="sendprimsg()"><img src="'+pubdir+'/images/new2/sendmsg.gif" alt="发送"></a></p></td></tr></table></div>';
    ye_dialog.openHtml(html,'发送私信','450','220');
    if (funame) {
        $("#senduser").val(funame);
        $("#senduser").attr('readonly','readonly');
    } else {
        $("#senduser").autocomplete(siteurl+"/Message/getMsgUser/rank/"+GetRandomNum(1,999999),{
            delay:400,
            minChars:1,
            matchSubset:0,
            matchContains:1,
            autoFill:0,
            scroll:0,
            width:170,
            height:170
        });
    }
}
function sendprimsg() {
    tologin();
    var funame=$("#senduser").val();
    var contents=$("#pmcontentbox").val();
    if (!funame || !contents) {
        ye_msg.open('表单还没有填写完整',1,2);
        return;
    }
    var url=siteurl+"/Message/sendmsg";
    var postDt="funame="+funame+"&content="+encodeURIComponent(contents)+"&rank="+GetRandomNum(1,999999);
    $.ajax({
        type: "POST",
        url:  url,
        data: postDt,
        success: function(msg){
            if (msg=="success") {
                ye_msg.open('私信发送成功了！',1,1);
                ye_dialog.close();
            } else {
                ye_msg.open(msg,1,2);
            }
        }
    });
}
/*send msg end*/
/*send talk*/
function ctrlEnter_st(e){
    var ie =navigator.appName=="Microsoft Internet Explorer"?true:false;
    if(ie){
        if(event.ctrlKey && window.event.keyCode==13){
            sendTalk();
        }
    }
    else {
        if(isKeyTrigger(e,13,true)){
            sendTalk();
        }
    }
}


function sendTalk(is_reportsend) {
   if(!tologin())return false;
    //if(is_send == true){
//		is_send = false;
//    	 ye_msg.open('请稍后在发送微博',1,2);
//         return false;
//    }
    var cont=$('#contentbox').val();
    var contclass=$('#contnetclass').val();
    var morecontent=$("#morecontent").html();/*upload pic*/

    if (!cont) {
    	is_send =false;
        ye_msg.open('您没有输入内容',1,2);
        return false;
    }

    if(contclass==CLS.NEWS && is_reportsend == 0) {
    	is_send =false;
    	if(!confirm('您确认本条信息以新闻的形式发出？')) {
    		return false;
    	}
    }
    //is_send= true;
    if(is_send  == false)
    {
    	return false;
    }
    $.ajax({
        type: "POST",
        url:  siteurl+"/Space/sendmsg",
        data: 'contclass='+contclass+"&content="+encodeURIComponent(cont)+"&morecontent="+morecontent+"&topic="+(URI.MODULE == 'Topic'?'1':'0')+"&rank="+GetRandomNum(1,999999),
        success: function(msg){
            if (msg!="error") {
				ye_msg.open('发表成功！',1,1);
				if(is_reportsend == 1){
					//window.location.reload();
                                        window.location.href = window.location.href;
				}else{
					if($('#contnetclass').val() == CLS.CLUE) {
            			window.location=siteurl+ '/'+user_name +'/home/'+CLS.TWITTER;
					}else{
						window.location=siteurl+ '/'+user_name +'/home/'+$('#contnetclass').val();
					}
				}

            } else {
                ye_msg.open('发表失败！',1,2);
            }
        }
    });
}

/*reply start*/
function ctrlEnter_rb(e,id,closebox){
    var ie =navigator.appName=="Microsoft Internet Explorer"?true:false;
    if(ie){
        if(event.ctrlKey && window.event.keyCode==13){
            replysend(id,closebox);
        }
    } else {
        if(isKeyTrigger(e,13,true)){
            replysend(id,closebox);
        }
    }
}
function replyajax(contid) {
    if ($('#reply_'+contid).html()) {
        $('#reply_'+contid).html('');
    } else {
        $('#reply_'+contid).html('<span style="margin:10px 0 0 30px"><img src="'+pubdir+'/images/spinner.gif"></span>');
        $.ajax({
            type: "GET",
            url:  siteurl+"/Space/reply/cid/"+contid+"/rank/"+GetRandomNum(1,999999),
            success: function(msg){
                $('#reply_'+contid).html(msg);
                $('#replybox_'+contid).focus();
            }
        });
    }
}

function replyajax_index(contid) {
	if(!tologin())return false;
    if ($('#reply_'+contid).html()) {
        $('#reply_'+contid).html('');
    } else {
        $('#reply_'+contid).html('<span style="margin:10px 0 0 30px"><img src="'+pubdir+'/images/spinner.gif"></span>');
        $.ajax({
            type: "GET",
            url:  siteurl+"/Space/reply_index/cid/"+contid+"/rank/"+GetRandomNum(1,999999),
            success: function(msg){
                $('#reply_'+contid).html(msg);
				$('#reply_'+contid).show();
                $('#replybox_'+contid).focus();
            }
        });
    }
}


function replyajaxbox(contid) {
    if ($('#reply_'+contid).html()) {
        $('#reply_'+contid).html('');
    } else {
        var html='<div class="status_reply_list"><div class="arrow1"></div><div class="top"></div><div class="cont"><table border="0" width="100%"><tr><td><div class="fleft" style="margin-top:8px"><a href="javascript:void(0);" onclick="showemotion(\'emotion_'+contid+'\',\'replybox_'+contid+'\')"><img src="'+pubdir+'/images/facelist.gif"></a></div><textarea id="replybox_'+contid+'" onkeyup="replynums(\'replybox_'+contid+'\',\'rnum_'+contid+'\');" onkeydown="javascript:return ctrlEnter_rb(event,\''+contid+'\',1);" class="input_text replytextarea"></textarea><div class="clearline"></div></td></tr><tr><td><div id="emotion_'+contid+'"></div><div class="fleft"><input type="checkbox" id="replycheckbox_'+contid+'"><label for="replycheckbox_'+contid+'" class="replycheckbox">同时转发到我的微博</label></div><div class="fright"><span class="inputnum">还能输入<em id="rnum_'+contid+'">140</em>字</span><input type="button" id="replybutton_'+contid+'" class="button3" value="评 论" onclick="replysend(\''+contid+'\',1)"/></div><div class="clearline"></div></td></tr></table></div><div class="bottom"></div></div>';
        $('#reply_'+contid).html(html);
        $('#replybox_'+contid).focus();
    }
}


function replysend(id,closebox) {
    tologin();
    var isret=$("#replycheckbox_"+id).attr('checked');
    if ($('#replybox_'+id).val()=="") {
        ye_msg.open('您没有填写回复的内容，请填写后发表！',1,2);
        return false;
    } else if ($('#replybox_'+id).val().length>140)  {
        ye_msg.open('内容长度不能大于140字符！',1,2);
        return false;
    } else {
        $('#replybutton_'+id).attr("disabled","disabled");
        var cont=countCharacters($('#replybox_'+id).val(),140);
        $.ajax({
            type: "POST",
            url: siteurl+"/Space/doreply",
            data:"sid="+id+"&closebox="+closebox+"&scont="+encodeURIComponent(cont)+"&rck="+isret+"&rank="+GetRandomNum(1,999999),
            success: function(msg){
                if (msg!="对方将您列入黑名单,不能完成发送！" && msg!="对方还没有收听您！" && msg!="数据传输错误！" && msg!="您还没有填写评论内容！") {
                    if(parseInt(closebox)==1){
                        ye_msg.open('评论/回复成功了！',1,1);
                        if(etobj.space == 'a' || etobj.space == 'r' || etobj.space == 't'){
                            document.location.reload();
                        }
                    } else {
                        if($('#replynum_' + id).length){
                            $('#replynum_' + id).html(parseInt($('#replynum_' + id).html()) + 1);
                        }
                        else{
                            $('#reply_a_' + id).html('评论(<span id="replynum_' + id + '">1</span>)');
                        }
                        var firstli,firstli2;
                        firstli=$(".reply_list_ul[replyid="+id+"] li").first();
                        if (firstli.length>0) {
                            firstli.before(msg);
                            firstli2=$(".reply_list_ul[replyid="+id+"] li").first();
                            firstli2.css("display","none");
                            firstli2.animate({
                                height: 'toggle',
                                opacity: 'toggle'
                            }, {
                                duration: "slow"
                            });
                        } else {
                            $(".reply_list_ul[replyid="+id+"]").append(msg);
                            firstli2=$(".reply_list_ul[replyid="+id+"] li").first();
                            firstli2.css("display","none");
                            firstli2.animate({
                                height: 'toggle',
                                opacity: 'toggle'
                            }, {
                                duration: "slow"
                            });
                        }
                    }
                    $('#replybox_'+id).val("");
                } else {
                    ye_msg.open(msg,1,2);
                }
                $('#replybutton_'+id).removeAttr("disabled");
            }
        });
    }
}
function replyajaxin(inputid,nickname) {
    var atto='回复'+nickname+' ';
    $('#replybox_'+inputid).focus();
    $('#replybox_'+inputid).val(atto);
}
function replynums(cval,nums){
    var len=$.trim($("#"+cval).val()).length;
    len=140-len;
    if (len<0) {
        $("#"+cval).val($.trim($("#"+cval).val()).slice(0,140));
        len=0;
    }
    $("#"+nums).html(len);
    $("#"+cval).height('18px');
    var setheight = $("#"+cval).get(0).scrollHeight;
    if($("#"+cval).attr("_height") != setheight) {
        $("#"+cval).height(setheight+"px").attr("_height",setheight);
    } else {
        $("#"+cval).height($("#"+cval).attr("_height")+"px");
    }
}
/*reply start*/
/*ret start*/
function retnums(cval,nums){
    var len=$.trim($("#"+cval).val()).length;
    len=140-len;
    if (len<0) {
        $("#"+cval).val($.trim($("#"+cval).val()).slice(0,140));
        len=0;
    }
    $("#"+nums).html(len);
}
function retwit(contid){
     if(!tologin())return false;
    var retcont=$("#ret"+contid).html();//alert(retcont);
    if (retcont) {
        retcont= retcont.replace(/<em ref="(.*?)">(.*?)<\/em>/gi,'$1');
        //表情转换
        var reg = new RegExp('(<img class="emo" src="'+etobj.pubdir+'/images/emotion/)(.*?)(.gif">&nbsp;)','ig');
        retcont= retcont.replace(reg, function(a, b, c, d){ return emoArray[c]; });
        //去掉html标签
        retcont= retcont.replace(/<[^>].*?>/g,"");
    }
    var retconttp=explode(retcont,'//',false);
    var newretcont='';
    //var at=$("#ret"+contid).prev().prev().attr("title");
    var at=$("#ret"+contid).prev().prev().html();

    var html='<table border="0" width="350px" style="margin-left:17px;float:left"><tr><td><div id="retbody"></div><div style="color:#999;margin-top:10px;overflow:hidden;*zoom:1;"><span class="fleft">再随便说几句：<a href="javascript:void(0);" onclick="showemotion(\'emotionret_'+contid+'\',\'retbox_'+contid+'\')"><img src="'+pubdir+'/images/facelist.gif"></a></span><span style="margin-right:10px;float:right">还能输入<em id="num_'+contid+'">140</em>字</span></div></td></tr><tr><td width="350"><div id="emotionret_'+contid+'"></div><textarea id="retbox_'+contid+'" class="input_text" onkeyup="retnums(\'retbox_'+contid+'\',\'num_'+contid+'\');" oninput="retnums(\'retbox_'+contid+'\',\'num_'+contid+'\');" style="width:350px;height:100px;margin:5px auto;color:#999"></textarea></td></tr><tr><td align="center" height="50px"><input type="button" id="replybutton_'+contid+'" class="button2" value="发送转发" onclick="retwitact(\''+contid+'\')"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="button3" value="取消转发" onclick="ye_dialog.close()"/></td></tr></table>';
    ye_dialog.openHtml(html,'转发到我的微博','400','');
    var tableH = $('#ye_dialog_body table').height()+90;
    $('#ye_dialog_window').height(tableH + $('#ye_dialog_title').height());
    $('#ye_dialog_body').height(tableH);
    $('#ye_dialog_window').append('<div style="clear:both"></div>');

    var rethtml=clearhtml($("#cont"+contid).html());
    rethtml=rethtml.replace("收起向右转向左转查看原图","");
    $('#retbody').html('转：'+rethtml);

    if (at!='undefined' && retconttp[0]!='null' && retcont!='undefined' && retcont!='null' && retcont!='') {
        retcont=" // "+"回复"+at+":"+retconttp[0];
        if (retconttp.length>1) {
            for (var i=1; i<retconttp.length; i++) {
                newretcont+="//" +retconttp[i];
            }
        }
        newretcont=retcont+newretcont;
    }
    if (retcont) {
        $('#retbox_'+contid).val(newretcont);
        retnums('retbox_'+contid,'num_'+contid);
    }
    var textArea = document.getElementById('retbox_'+contid);
    if (document.selection) {
        var rng = textArea.createTextRange();
        rng.collapse(true);
        rng.moveEnd("character",0);
        rng.moveStart("character",0);
        rng.select();
    } else if (textArea.selectionStart || (textArea.selectionStart == '0')) {
        textArea.selectionStart = 0;
        textArea.selectionEnd = 0;
    }
    textArea.focus();
}

function retwitact(contid) {
    tologin();

    var retwitval=$("#retbox_"+contid).val();
    ye_dialog.close();
    $.ajax({
        type: "POST",
        url:  siteurl+"/Space/retwit",
        data: 'cid='+contid+"&retcont="+encodeURIComponent(retwitval)+"&rank="+GetRandomNum(1,999999),
        success: function(msg){
            if (msg!='error') {
                window.location=siteurl+ '/'+user_name +'/home/'+CLS.TWITTER;
            } else {
                ye_msg.open('很抱歉，转发失败！',1,2);
            }
        }
    });
}
/*ret end*/
function doverifyclue(clsid,cid, times, type){
    tologin();
    $.ajax({
        type: "GET",
        url: siteurl+'/Space/doverifyclue/clsid/'+clsid+'/cid/'+cid+'/times/'+times+'/type/'+type+'/rank/'+GetRandomNum(1,999999),
        success: function(msg){
            if (msg!='未知错误,请重试' && msg!='只能证实线索或现场目击' && msg!='您已证实过') {
                ye_msg.open('证实成功',1,1);
                $('#wyzs_' + cid).html(msg);
				var star = $('#wyzs_' + cid).find('em').attr('class');
				var num = $('#wyzs_' + cid +' cite b').html();
				$('.wyzshover em').addClass(star);
				$('.wyzshover cite b').html(num);

            } else {
                ye_msg.open(msg,1,2);
            }
        }
    });
}
function wyzshover(){
	if($('.wyzs').length<=0) return false;
    var ei = $('.wyzshover');
    var t;

    $('.wyzs').live('mouseover',function(){
        clearInterval(t);
        ei.html($(this).html());
        var t = $(this).offset().top - 80;
        var l = $(this).offset().left;
        ei.css({
            'top':t,
            'left':l,
            'display':'block',
            'position':'absolute'
        });
    });
    $('.wyzshover').live('mouseover',function(){
        clearInterval(t);
    });
    $('.wyzshover').live('mouseout',function(){
        var obj = $(this);
        t = setInterval(function(){
            obj.hide().html('');
        },1000)
    });
}

function clearhtml(text) {
    var regEx = /<[^>]*>/g;
    return text.replace(regEx, "");
}
function isChinese(str) {
    var lst = /[u00-uFF]/;
    return !lst.test(str);
}
function CheckLen(str) {
    var strlength=0;
    for (i=0;i<str.length;i++) {
        if (isChinese(str.charAt(i))==true) {
            strlength=strlength + 2;
        } else {
            strlength=strlength + 1;
        }
    }
    return strlength;
}
function countCharacters(str, len) {
    if(!str || !len) {
        return '';
    }
    var a = 0;
    var i = 0;
    var temp = '';
    for (i=0;i<str.length;i++) {
        a++;
        if(a > len) {
            return temp;
        }
        temp += str.charAt(i);
    }
    return str;
}
function countCharacters2(str, startlen,len) {
    if(!str) {
        return '';
    }
    var _startlen=startlen?startlen:0;
    var _len=len?len:(str.length-startlen);
    var a = 0;
    var i = 0;
    var temp = '';
    for (i=_startlen;i<str.length;i++) {
        a++;
        if(a == _len+1) {
            return temp;
        } else {
            temp += str.charAt(i);
        }
    }
    return temp;
}
function cnCharacters(str, len) {
    if(!str || !len) {
        return '';
    }
    var a = 0;
    var i = 0;
    var temp = '';
    for (i=0;i<CheckLen(str);i++) {
        if (isChinese(str.charAt(i))==true) {
            a+=2;
        } else {
            a++;
        }
        if(a > len) {
            return temp;
        }
        temp += str.charAt(i);
    }
    return str;
}
/*reg check*/
function check_register() {
    var t0=$('#invitecode').val();
    var t1=$('#username').val();
    var t2=$('#mailadres').val();
    var t3=$('#password1').val();
    var t4=$('#password2').val();
    var t5=$('#inviteuid').val();

    $.ajax({
        type: "POST",
        url:  siteurl+"/regcheck",
        data: "invitecode="+t0+"&uname="+t1+"&mail="+t2+"&pass1="+t3+"&pass2="+t4+"&inviteuid="+t5+"&rank="+GetRandomNum(1,999999),
        success:function(msg){
            if (msg=="check_ok") {
                ye_dialog.openHtml("<div class='regok'>恭喜您，已经注册成功了，立即进入下一步！</div>",'新用户注册',400,100);
                setInterval(function(){
                    window.location.href=siteurl+'/Setting';
                }, 1000);
            } else {
                ye_msg.open(msg,3,2);
            }
        }
    });
}
function reportbox() {
    tologin();
    var html='<div id="report"><p>如果您发现有色情、暴力或者其它违规的内容,请提交，我们将尽快处理。</p><p><select id="reporttp"><option value="0" selected="selected">=请选择不良信息的类型=</option><option value="1">涉及黄色和暴力</option><option value="2">政治反动</option><option value="3">内容侵权</option><option value="4">其他不良信息</option></select></p><p>不良信息描述并请提交不良信息的地址</p><p><textarea id="describe" class="input_text">当前地址：'+document.URL+'\n\r举报内容：</textarea></p><p><center><input type="button" class="button2" value="提交信息" onclick="reportact()"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="button3" type="button" value="关闭窗口" onclick="ye_dialog.close()"/></center></p></div>';
    ye_dialog.openHtml(html,'举报不良信息','400','350');
}
function reportact() {
    tologin();
    var l=$('#reporttp').val();
    var d=$('#describe').val();
    if(l==0 || !d){
        ye_msg.open('您的举报信息没有填写完整！',1,2);
        return false;
    }
    $.ajax({
        type: "POST",
        url:  siteurl+"/Space/report",
        data: "reporttp="+encodeURIComponent(l)+"&describe="+encodeURIComponent(d)+"&rank="+GetRandomNum(1,999999),
        success:function(msg){
            if (msg=="success") {
                ye_msg.open('感谢您的举报，我们会尽快处理^_^',1,1);
                ye_dialog.close();
            } else {
                ye_msg.open(msg,3,2);
            }
        }
    });
}
function indextop() {
    if(jQuery('body').scrollTop() > 0) {
        jQuery('body').animate({
            scrollTop:0
        }, 'fast');
        return false;
    } else {
        jQuery('html').animate({
            scrollTop:0
        }, 'fast');
        return false;
    }
}
/*upload pic*/
/*upload pic*/
function cencelUpload() {
    $("#imageUpload").attr("src","about:blank");
    $("#priviewbtn").hide();
    $("#priviewbtn").html('');
    $("#uploading").hide();
    $("#uploadbtn").val('');
    $("#imageUpload").contents().find("body").html('');
    $("#morecontent").html('');
}
function uploadpic(file) {
    var pic=file.toLowerCase();

    if(pic.indexOf( ".gif")>-1 || pic.indexOf( ".jpg")>-1 || pic.indexOf( ".jpeg")>-1 || pic.indexOf( ".bmp")>-1 || pic.indexOf( ".png")>-1) {
        $("#imageUpload").attr("src","about:blank");
        $("#priviewbtn").hide();
        $("#priviewbtn").html('');
        $("#uploading").show();
        $("#upform").submit();
        $('#imageUpload').unbind("load");
        $("#imageUpload").load(function(){
            loadpic();
        });
    } else {
        ye_msg.open('很抱歉，您上传的文件格式不正确！',1,2);
        $("#uploadbtn").val('');
    }
}
function loadpic() {
    var htmls=$("#imageUpload").contents().find("body").html();

    var obj = jQuery.parseJSON(htmls);

    if (htmls) {
        if (obj.ret=='success') {
            $("#uploading").hide();
            $("#priviewbtn").show();
            $("#priviewbtn").html(obj.name+"<a href='javascript:void(0);' onclick='delUpload()'> [删除]</a>");
            $("#priviewpoic").html("<img src='"+obj.img+"'>");
            $("#imageUpload").contents().find("body").html('');
            $("#morecontent").html(obj.content);
            if (!$('#contentbox').val()) {
                $('#contentbox').val('我分享了照片');
            }
        } else {
            $("#uploading").hide();
            $("#priviewbtn").hide();
            $("#priviewbtn").html('');
            $("#priviewpoic").html('');
            $("#imageUpload").contents().find("body").html('');
            $("#morecontent").html('');
            ye_msg.open(obj.ret,3,2);
        }
    }
}
function delUpload() {
    $("#uploading").hide();
    $("#priviewbtn").hide();
    $("#priviewbtn").html('');
    $("#sharephoto").hide();
    $("#priviewpoic").html('');
    $("#uploadbtn").val('');
    $("#imageUpload").contents().find("body").html('');
    $("#morecontent").html('');
}
function ETCopy(id){
    var testCode=document.getElementById(id).value;
    if(copy2Clipboard(testCode)!=false){
        document.getElementById(id).select() ;
        ye_msg.open('已复制剪贴板，用Ctrl+V粘贴吧',3,1);
    }
}
copy2Clipboard=function(txt){
    if(window.clipboardData){
        window.clipboardData.clearData();
        window.clipboardData.setData("Text",txt);
    }
    else if(navigator.userAgent.indexOf("Opera")!=-1){
        window.location=txt;
    }
    else if(window.netscape){
        try{
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
        catch(e){
            alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试，相对路径为firefox根目录/greprefs/all.js");
            return false;
        }
        var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if(!clip){
            return;
        }
        var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if(!trans){
            return;
        }
        trans.addDataFlavor('text/unicode');
        var str=new Object();
        var len=new Object();
        var str=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext=txt;
        str.data=copytext;
        trans.setTransferData("text/unicode",str,copytext.length*2);
        var clipid=Components.interfaces.nsIClipboard;
        if(!clip){
            return false;
        }
        clip.setData(trans,null,clipid.kGlobalClipboard);
    }
};
function GetRandomNum(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}
function dosearch(){
    var v=$('#searchr-input').val();
    var t=$('#commonsearch').val();
    if(v!='请输入关键字' && v!=''){
        window.location.href=siteurl+'/Find/'+t+'?sname='+encodeURIComponent(v);
    }else{
        $('#searchr-input').val('请输入关键字');
    }
}
function Sharetopic() {
    var oldText = $('#contentbox').val();
    var pre_oldText = oldText.substr(0, mPosition);
	var after_oldText = oldText.substr(mPosition);
	$('#contentbox').val(pre_oldText+'#输入话题标题#'+after_oldText);
    var textArea = document.getElementById('contentbox');
    if (document.selection) {
        var rng = textArea.createTextRange();
        rng.collapse(true);
        rng.moveEnd("character",7+mPosition);
        rng.moveStart("character",1+mPosition);
        rng.select();
    } else if (textArea.selectionStart || (textArea.selectionStart == '0')) {
    	var textStr = textArea.value;
        textArea.selectionStart = mPosition +1;
        textArea.selectionEnd = mPosition +7;
    }

    textArea.focus();

    $('#contentbox').trigger('keyup');
}
function Sharehotnews(obj) {

    var str = '#'+$(obj).text()+'#';
    var len = str.length;
    var oldlen = $('#contentbox').val().length;

    var oldText = $('#contentbox').val();
    var pre_oldText = oldText.substr(0, mPosition);
	var after_oldText = oldText.substr(mPosition);
	$('#contentbox').val(pre_oldText + str + after_oldText);
    mPosition = mPosition+len;
    var textArea = document.getElementById('contentbox');
    if (document.selection) {
        var rng = textArea.createTextRange();
        rng.collapse(true);
        rng.moveEnd("character",len+oldlen);
        rng.moveStart("character",len+oldlen);
        rng.select();
    } else if (textArea.selectionStart || (textArea.selectionStart == '0')) {
        textArea.selectionStart = len+oldlen;
        textArea.selectionEnd = len+oldlen;
    }
    textArea.focus();

    $('#contentbox').trigger('keyup');

}
function explode(inputstring, separators, includeEmpties) {
    inputstring = new String(inputstring);
    separators = new String(separators);
    if(separators == "undefined") {
        separators = " :;";
    }
    fixedExplode = new Array(1);
    currentElement = "";
    count = 0;
    for(x=0; x < inputstring.length; x++) {
        str = inputstring.charAt(x);
        if(separators.indexOf(str) != -1) {
            if ( ( (includeEmpties <= 0) || (includeEmpties == false)) && (currentElement == "")) {
            }else {
                fixedExplode[count] = currentElement;
                count++;
                currentElement = "";
            }
        }
        else {
            currentElement += str;
        }
    }
    if (( ! (includeEmpties <= 0) && (includeEmpties != false)) || (currentElement != "")) {
        fixedExplode[count] = currentElement;
    }
    return fixedExplode;
}
function isKeyTrigger(e,keyCode){
    var argv = isKeyTrigger.arguments;
    var argc = isKeyTrigger.arguments.length;
    var bCtrl = false;
    if(argc > 2){
        bCtrl = argv[2];
    }
    var bAlt = false;
    if(argc > 3){
        bAlt = argv[3];
    }
    var nav4 = window.Event ? true : false;
    if(typeof e == 'undefined') {
        e = event;
    }
    if( bCtrl && !((typeof e.ctrlKey != 'undefined') ? e.ctrlKey : e.modifiers & Event.CONTROL_MASK > 0)){
        return false;
    }
    if( bAlt && !((typeof e.altKey != 'undefined') ? e.altKey : e.modifiers & Event.ALT_MASK > 0)){
        return false;
    }
    var whichCode = 0;
    if (nav4) whichCode = e.which;
    else if (e.type == "keypress" || e.type == "keydown") whichCode = e.keyCode;
    else whichCode = e.button;
    return (whichCode == keyCode);
}

function toblacklist(user_id){
    tologin();
    if(confirm('确认要将该用户加入黑名单吗?')){
        $.ajax({
            type: "GET",
            url: siteurl+'/Space/toblacklist/user_id/'+user_id+'/rand/'+GetRandomNum(1,999999),
            success: function(msg){
                if (msg=="success") {
                    ye_msg.open('加入黑名单成功',1,1);
                } else {
                    ye_msg.open(msg,3,2);
                }
            }
        });
    }
}
$.fn.extend({
	position:function( value ){
		var elem = this[0];
			if (elem&&(elem.tagName=="TEXTAREA"||elem.type.toLowerCase()=="text")) {
			   if($.browser.msie){
					   var rng;
					   if(elem.tagName == "TEXTAREA"){
						    rng = event.srcElement.createTextRange();
						    rng.moveToPoint(event.x,event.y);
					   }else{
					    	rng = document.selection.createRange();
					   }
					   if( value === undefined ){
					   	 rng.moveStart("character",-event.srcElement.value.length);
					     return  rng.text.length;
					   }else if(typeof value === "number" ){
					   	 var index=this.position();
						 index>value?( rng.moveEnd("character",value-index)):(rng.moveStart("character",value-index))
						 rng.select();
					   }
				}else{
					if( value === undefined ){
					   	 return elem.selectionStart;
					   }else if(typeof value === "number" ){
					   	 elem.selectionEnd = value;
       			         elem.selectionStart = value;
					   }
				}
			}else{
				if( value === undefined )
				   return undefined;
			}
	}
})
function getPosition() {
	mPosition = $('#contentbox').position();

}

//标签切换
function setTab(name,cursel,n){
	   for(i=1;i<=n;i++){
	   var menu=document.getElementById(name+i);
	   var con=document.getElementById("col_"+name+"_"+i);
	   menu.className=i==cursel?"current":"";
	   con.style.display=i==cursel?"block":"none";
}
}

function tab(id){
dom1 = document.getElementById("title").getElementsByTagName("li");
dom2 = document.getElementById("content").getElementsByTagName("span");
for(var i=0; i<dom1.length; i++){dom1[i].className='';dom2[i].style.display='none';}
dom1[id].className='show';dom2[id].style.display='';}

function dologin(){
    if($('#loginname').val() == ''){
        alert('请输入注册邮箱');
        return false;
    }
    if($('#password').val() == ''){
        alert('请输入密码');
        return false;
    }
    if(!isEmail($('#loginname').val())){
        alert('注册邮箱格式不正确');
        return false;
    }

    return true;
}

function isEmail(str){
   var reg = /^([a-zA-Z0-9_-]|.)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
   return reg.test(str);
}


	/**
	 * 获取我的投票列表
	 */
	function getReplyList(url, options)
	{


		if (isUndefined(options)) {
			options = {};
		}
		var dataUrl = url;
		$.get(
			dataUrl,
			options,
			function(r) {
						$('#reply_id_'+options.cid).html(r);
			}
		);
	}
	function isUndefined(variable) {
		return typeof variable == 'undefined' ? true : false;
	}


function wblayout(){
    var _tptimeid;
    $('.wblayerbox').mouseover(function(event){
        clearTimeout(_tptimeid);
    }).mouseout(function(event){
        _tptimeid=setTimeout(function(){
            $('.wblayerbox').hide();
        },1);
    });
    _tptimeid=setTimeout(function(){
        $('.wblayerbox').hide();
    },500);
    clearTimeout(wblayertimeid);
}
function wblayeract(){
    $('.author').mouseover(function(e){
        $('.wblayerbox').hide();
        clearTimeout(wblayertimeid);
        var top=$(this).offset().top;
        var left=$(this).offset().left;
        var name=$(this).html();
        e = e || window.event;
        var mtop;
        if (parseInt(e.clientY)>120) {
            mtop='nbottom';
            top=top-125;
        } else {
            mtop='ntop';
            top=top+25;
        }
        wblayertimeid=setTimeout(function(){
            wblayer(name,'left:'+left+'px;top:'+top+'px',mtop);
        },1000);
    }).mouseout(function(){
        wblayout();
    });
	$('.txt').mouseover(function(e){
        $('.wblayerbox').hide();
        clearTimeout(wblayertimeid);
        var top=$(this).offset().top;
        var left=$(this).offset().left;
        var name=$(this).html();
        e = e || window.event;
        var mtop;
        if (parseInt(e.clientY)>120) {
            mtop='nbottom';
            top=top-125;
        } else {
            mtop='ntop';
            top=top+25;
        }
        wblayertimeid=setTimeout(function(){
            wblayer(name,'left:'+left+'px;top:'+top+'px',mtop);
        },1000);
    }).mouseout(function(){
        wblayout();
    });
    $('.atlink').mouseover(function(e){
        $('.wblayerbox').hide();
        clearTimeout(wblayertimeid);
        var top=$(this).offset().top;
        var left=$(this).offset().left;
        var name=$(this).html().replace('@','');
        e = e || window.event;
        var mtop;
        if (parseInt(e.clientY)>120) {
            mtop='nbottom';
            top=top-125;
        } else {
            mtop='ntop';
            top=top+25;
        }
        wblayertimeid=setTimeout(function(){
            wblayer(name,'left:'+left+'px;top:'+top+'px',mtop);
        },1000);
    }).mouseout(function(){
        wblayout();
    });
    $('.avatar').mouseover(function(e){
        $('.wblayerbox').hide();
        clearTimeout(wblayertimeid);
        var top=$(this).offset().top;
        var left=$(this).offset().left;
        var name=$(this).find('img').attr('alt');
        e = e || window.event;
        var mtop;
        if (parseInt(e.clientY)>120) {
            mtop='nbottom';
            top=top-125;
        } else {
            mtop='ntop';
            top=top+59;
        }
        wblayertimeid=setTimeout(function(){
            wblayer(name,'left:'+left+'px;top:'+top+'px',mtop);
        },1000);
    }).mouseout(function(){
        wblayout();
    });
}
function sidelay(){
    $('.followpreview').mouseover(function(e){
        $('.wblayerbox').hide();
        clearTimeout(wblayertimeid);
        var top=$(this).offset().top;
        var left=$(this).offset().left;
        var name=$(this).attr('alt');
        left=left-312;
        wblayertimeid=setTimeout(function(){
            wblayer(name,'left:'+left+'px;top:'+top+'px','nright');
        },1000);
    }).mouseout(function(){
        wblayout();
    });
}
function followlay(){
    $('li > .fleft > a').mouseover(function(e){
        $('.wblayerbox').hide();
        clearTimeout(wblayertimeid);
        var top=$(this).offset().top;
        var left=$(this).offset().left;
        var name=$(this).html();
        e = e || window.event;
        var mtop;
        if (parseInt(e.clientY)>170) {
            mtop='nbottom';
            top=top-170;
        } else {
            mtop='ntop';
            top=top+20;
        }
        wblayertimeid=setTimeout(function(){
            wblayer(name,'left:'+left+'px;top:'+top+'px',mtop);
        },1000);
    }).mouseout(function(){
        wblayout();
    });
}
function wblayer(nickname,div,pos){/*pos=ntop nbottom nright*/

    var ext=$('.wblayerbox[nickname='+nickname+']');
    if (ext.html()!=null) {
        ext.attr('style',div+';display:none');
        ext.find('.mm').find('div').first().removeClass();
        ext.find('.mm').find('div').first().addClass(pos);
        ext.fadeIn("fast");
    } else {




var html='<div class="wblayerbox" nickname="'+nickname+'" style="left: 272px; top: 180px; display: none;">';
	     html+='	  <table class="wbLayer" cellpadding="0" cellspacing="0">';
	     html+='		<tbody>';
	     html+='		  <tr>';
		 html+='		<td class="topl"></td>';
		 html+='		<td class="topm"></td>';
		 html+='		<td class="topr"></td>';
		 html+='	  </tr>';
		 html+='	  <tr>';
		 html+='		<td class="ml"></td>';
		 html+='		<td class="mm">';
		 html+='		<div class="nbottom"></div>';
		 html+='		  <div class="laycont" >';
		 html+='		  </div></td>';
		 html+='		<td class="mr"></td>';
		 html+='	  </tr>';
		 html+='	  <tr>';
		 html+='		<td class="bottoml"></td>';
		 html+='	<td class="bottomm"></td>';
		 html+='<td class="bottomr"></td>';
		 html+=' </tr>';
		 html+='</tbody>';
		 html+='</table>';
		 html+='</div>';
        $('#container').append(html);

        ext=$('.wblayerbox[nickname='+nickname+']');
		 ext.find('.mm').find('div').first().removeClass();
        ext.find('.mm').find('div').first().addClass(pos);
       ext.fadeIn("fast");

        $.post(siteurl+"/Api/userpreview",{nickname:nickname},
        function(msg){
            ext.find('.laycont').html(msg);

        });
    }

}
