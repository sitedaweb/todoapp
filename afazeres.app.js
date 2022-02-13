
document.ontouchmove = (e) => {
    mY = e.changedTouches[0].clientY;
    mX = e.changedTouches[0].clientX;
    el.style.left = (mX - 25) + "px";
    el.style.top = (mY - 25) +"px";
}

document.ontouchend = (e) => {
    document.body.removeChild(el);
}

document.ontouchcancel = (e) => {
    document.body.removeChild(el);
}

String.prototype.format = function() {
   var i = 0, args = arguments;
   return this.replace(/{}/g, function() {
      return typeof args[i] != "undefined" ? args[i++]: "";
   })
}

function terAlvo(e) {
   if (!e) {
       e = this.event
   }
   return e.target || e.srcElement;
}

var msg2 = document.getElementById("msg2");
var msg = document.getElementById("msg");
var add = document.getElementById('adicionar');
var header = document.querySelector('#header');
var cabecalho = document.querySelector('.cabeca');
var comecoY,
movimentoY,
estaMovendo, 
estaAberto;
var comecoX,
movimentoX,
estaMovendoX;
var campo = document.querySelector('.campo');
var btnCancelar = document.querySelector('#cancelar--campo');
var btnConcluido = document.querySelector('#concluido--campo');
var atividade = document.querySelector('.atividade');
var hora = document.querySelector('#hora');
var titulo = document.querySelector('#titulo');
var corpo = document.querySelector("#corpo");

add.addEventListener('click', () => {
	campo.style.display = 'block';
	campo.classList.remove('sem-transicao');
       header.style.opacity = 0.3;
       //corpo.style.opacity = 0.3;
	campo.style.transition = 'transform .2s ease';
	document.body.style.maxHeight = '100%';
	document.body.style.overflowY = 'hidden';
	setTimeout(() => { campo.style.transform = 'translateY(0)';}, 10);
	corpo.style.opacity = 0.3;
}, false);

btnCancelar.addEventListener('click', fecharCampo, false);
btnConcluido.addEventListener('click', fecharCampo, false);


btnConcluido.addEventListener('click', () => {
      var valorH = hora.value;
      var valorT = titulo.value;
	
	var vAtividade = document.createElement('div');
	
	vAtividade.className = 'v-atividade';
	
	vAtividade.style.animation = 'abrir .27s ease';
	
	vAtividade.addEventListener("touchstart", function (e) {
		comecoX = e.targetTouches[0].clientX;
	}, false);
	
	vAtividade.addEventListener("touchmove", function (e) {
		movimentoX = e.changedTouches[0].clientX - comecoX;
		if (movimentoX < 0) {
			vAtividade.style.transform = "translateX(" + movimentoX + "px)";
			vAtividade.classList.add('sem-transicao');
		};
		
		if (movimentoX <= -30)
			estaMovendoX = true;
	}, false);
	
	
	vAtividade.addEventListener("touchend", function () {
		vAtividade.classList.remove('sem-transicao');
		if (movimentoX <= -200) {
		
			vAtividade.classList.remove('sem-transicao');
			vAtividade.style.transition = 'transform .1s ease';
			vAtividade.style.transform = 'translateX(-100%)';
			
			setTimeout(() => {
				vAtividade.style.display = 'none';
				msg2.className = "mostrar";
				setTimeout(function() { 
					msg2.className = msg2.className.replace("mostrar", ""); 
				}, 2900);
			}, 200);
			
		} else {
			vAtividade.style.transform = "translateX(0)";
			vAtividade.style.transition = "transform .2s ease";
		}
		movimentoX = 0;
		comecoX = 0;
		estaMovendoX = false;
	}, false);
	
	vAtividade.innerHTML = '<h2 class="horas" >'+ valorH +'</h2><span class="titulo" >' + valorT + '</span>';
	atividade.appendChild(vAtividade);
	

	//mensagem
	msg.className = "mostrar";
	setTimeout(function() { 
		msg.className = msg.className.replace("mostrar", ""); 
	}, 2900);

	corpo.style.opacity = 1;
}, false);

function fecharCampo() {
	if (!estaAberto) {
		campo.style.transform = 'translateY(100%)';
		header.style.opacity = 1;
		corpo.style.opacity = 1;
		campo.classList.remove('sem-transicao');
		setTimeout(() => {
			campo.style.display = "none";
			estaAberto = false;
			document.body.style.maxHeight = '';
			document.body.style.overflowY = 'auto';
                     hora.value = '00:00';
		        titulo.value = '';
			 
		}, 200);
	}
}

campo.addEventListener("touchstart", function (e) {
	comecoY = e.targetTouches[0].clientY;
}, false);
	
campo.addEventListener("touchmove", function (e) {
	movimentoY = e.changedTouches[0].clientY - comecoY;
	if (movimentoY > 0) {
		campo.style.transform = "translateY(" + movimentoY + "px)";
		campo.classList.add('sem-transicao');
		if (movimentoY > 20) estaMovendo = true;	
	};
}, false);
	
		
campo.addEventListener("touchend", function () {
	campo.classList.remove('sem-transicao');
	if (movimentoY > 200) {
              fecharCampo();
       } else {
		campo.style.transform = "translateY(0)";
		campo.style.transition = "transform .2s ease";
	}
	
	movimentoY = 0;
	comecoY = 0;
	estaMovendo = false;
}, false);

var btnMenu = document.querySelector("#menu"),
       menu = document.querySelector(".menu");
btnMenu.onclick = () => {
       menu.style.display = 'block';
	menu.classList.remove('sem-transicao');
       header.style.opacity = 0.3;
	corpo.style.opacity = 0.3;
	menu.style.transition = 'transform .2s ease';
	document.body.style.maxHeight = '100%';
	document.body.style.overflowY = 'hidden';
	setTimeout(() => { menu.style.transform = 'translateY(0)';}, 10);
}

menu.addEventListener("touchstart", function (e) {
	comecoY = e.targetTouches[0].clientY;
}, false);
	
menu.addEventListener("touchmove", function (e) {
	movimentoY = e.changedTouches[0].clientY - comecoY;
	if (movimentoY > 0) {
		menu.style.transform = "translateY(" + movimentoY + "px)";
		menu.classList.add('sem-transicao');
		if (movimentoY > 20) estaMovendo = true;	
	};
}, false);
	
		
menu.addEventListener("touchend", function () {
	menu.classList.remove('sem-transicao');
	if (movimentoY > 200 && estaMovendo) {
              fecharMenu();
       } else {
		menu.style.transform = "translateY(0)";
		menu.style.transition = "transform .2s ease";
	}
	
	movimentoY = 0;
	comecoY = 0;
	estaMovendo = false;
}, false);

function fecharMenu() {
	if (!estaAberto) {
		menu.style.transform = 'translateY(100%)';
		header.style.opacity = 1;
		corpo.style.opacity = 1;
		menu.classList.remove('sem-transicao');
		setTimeout(() => {
			menu.style.display = "none";
			estaAberto = false;
			document.body.style.maxHeight = '';
			document.body.style.overflowY = 'auto';
		}, 200);
	}
}

/* fim (-_-) */