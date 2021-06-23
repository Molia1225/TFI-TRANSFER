<!--
 * @Autor: XinWei
 * @Date: 2021-03-11 17:24:29
 * @LastEditors: XinWei
 * @LastEditTime: 2021-04-26 18:10:58
 * @Description: 美股交易指引
-->
<template>
	<div class='ib-guide'>
		<div class="title-block">
			<span>想要交易美股，您需要完成以下几个步骤</span>
		</div>
		<div class="app-guide">
			<img
				src="../../assets/images/guide.png"
				alt=""
			>
		</div>
		<div class="title-block">
			<span>一.开通美股账户</span>
		</div>
		<p>1、如果您在开通天风国际证券账户的时候勾选了“美股”，那么您开户完成后，开户手机号将会收到美股开户成功短信。短信中包含了您的美股账户和密码信息，请妥善保存哦。</p>
		<p>2、如果您在开通天风国际证券账户的时候并未勾选“美股”，那么您可以在登录天风国际证券APP后，点击交易，再点击美股，在打开的页面中点击“去开户”，就可以去开通美股账户了。</p>
		<div class="app-guide">
			<img
				src="../../assets/images/app-guide.png"
				alt=""
			>
		</div>
		<p>3、美股开户流程</p>
		<p>美股开户的流程非常简单，仅需要确认个人信息和职业信息，就可以提交开户申请了。</p>
		<p>美股的开户审批预计会在2个工作日内完成。</p>
		<div class="title-block">
			<span>二.重置密码</span>
		</div>
		<p>收到美股开户成功的短信之后，为了保护您的账户安全，需要您重置您的交易密码。请点击开户短信内的重置密码链接重置您的交易密码。</p>
		<p>您也可以在这里登录并重置您的美股交易密码：<a
				class="link"
				href="javascript:;"
				@click="resetPwd"
			>点击重置</a></p>
		<div class="app-guide">
			<img
				src="../../assets/images/resetPwd.png"
				alt=""
			>
		</div>
		<!-- <div class="app-guide" style="margin-top:10px;">
      <img src="../../assets/images/uploadCard.png" alt="">
    </div> -->
		<div class="title-block">
			<span>三.向账户入金</span>
		</div>
		<p>天风国际证券接收来自内地银行，境外银行，香港银行的外汇汇款，具体的流程，<span class="orange">请您查看天风国际证券入金指引</span>。</p>
		<!-- <p>请注意：划转资金大概会在1个工作日内到账，资金到账前，您可能无法在港股和美股账户上查看到这笔资金。如果资金划转失败，资金会原路退回至您的账户，请勿担心。</p> -->
		<div class="title-block">
			<span>四.划转资金至美股账户</span>
		</div>
		<p>进行美股交易，需要您将港股账户上的资金划转至美股账户。<span class="orange">目前仅支持美元资金划转，请您在向天风国际入金时选择美元入金</span>，简化交易流程。如果您账户上仅有港币，您也可以提出换汇申请，将其他币种兑换成美金后进行资金划转。</p>
		<p>资金划转大概会在1个工作日内完成，如果您有同时交易港股和美股的需求，请您合理分配两个账户上的资金，以免错过投资时机。</p>
		<p>美股开户完毕后，登录天风国际证券APP，点击交易-美股，这时您会看到资金划转的入口。点击资金划转，您将进入到资金划转的具体功能内。在此功能下，您可以进行港股资金和美股资金之间的相互划转。</p>
		<div class="app-guide">
			<img
				src="../../assets/images/app-guide1.png"
				alt=""
			>
		</div>
		<p>请注意：划转资金大概会在1个工作日内到账，资金到账前，您可能无法在港股和美股账户上查看到这笔资金。如果资金划转失败，资金会原路退回至您的账户，请勿担心。</p>
		<div class="title-block">
			<span>五.下载交易软件</span>
		</div>
		<p>在等待划转资金的时候，您就可以去下载美股交易软件啦。请您截图并识别下方的二维码进下载安装。您可以下载Windows系统的PC软件 TFI Desktop Trader ，OS系统的PC软件 TFI Desktop Trader，IOS或者安卓系统的 Handy Trader App。同时，您也可以直接访问网页版本进行交易和账户管理。所有的软件都可以在以下二维码链接中进行下载。</p>
		<div class="app-guide">
			<img
				class="qrcode-img"
				src="../../assets/images/qrcode.png"
				alt=""
			>
			<span class="qrcode-txt">识别二维码下载</span>
		</div>
		<div class="title-block">
			<span>六.登录交易软件</span>
		</div>
		<p>接着，您需要使用您的美股交易账户和新的密码登录美股交易软件。登录成功后，您就可以进行美股交易了。</p>
	</div>
</template>

<script>
import { jsBridge } from '@/utils/jsBridge'
export default {
	components: {},
	data () {
		return {

		};
	},
	mounted () { },
	methods: {
		resetPwd () {
			let url = 'https://www.clientam.com/sso/Login?partnerID=Tfisec'
			jsBridge.openUrl({
				url,
				title: '登录美股账户'
			})
		}
	},
}
</script>
<style lang='less' scoped>
@import url('~@/assets/less/common.less');
.ib-guide {
	min-height: 100vh;
	background-color: #02121e;
	color: #fff;
	padding: 16px;
	padding-bottom: 55px;
	p {
		color: #a3b0be;
		line-height: 20px;
		margin-bottom: 5px;
		text-align: justify;
		word-wrap: break-word;
		.orange,
		a.link {
			display: inline;
			color: #fd9716;
			word-wrap: break-word;
		}
		a.link {
			text-decoration: underline;
		}
	}
}
.title-block {
	font-size: 18px;
	color: #fff;
	position: relative;
	height: 13px;
	display: inline-block;
	margin-top: 50px;
	margin-bottom: 15px;
	&::before {
		display: block;
		bottom: 0;
		margin-bottom: -23px;
		content: '';
		width: 100%;
		height: 8px;
		background: linear-gradient(270deg, rgba(253, 151, 22, 0) 0%, #fd9716 100%);
		border-radius: 4px;
	}
}
.app-guide {
	text-align: center;
	margin-top: 17px;
	margin-bottom: 20px;
	img {
		max-width: 100%;
		height: auto;
	}
	.qrcode-img {
		width: 142px;
		height: 142px;
		margin: 30px auto 20px;
		display: block;
	}
	.qrcode-txt {
		color: #a3b0be;
		font-size: 14px;
	}
}
</style>