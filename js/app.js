window.onload = () => {
	document.getElementById('cep').onblur = () => {
		getDadosEnderecoPorCEP(document.getElementById('cep').value)
	}

	document.getElementById('cep').onkeypress = (evento) => {
		if (evento.key === 'Enter') {
			getDadosEnderecoPorCEP(document.getElementById('cep').value)
		}
	}
}

function getDadosEnderecoPorCEP(cep) {

	if (cep == '') {
		return false
	}

	cep.replace('-', '')

	if (document.getElementById('msg-erro')) {
		document.getElementById('principal').removeChild(document.getElementById('msg-erro'))
	}

	if (isNaN(cep) || cep.length !== 8) {
		exibirErro()
		return false
	}

	url = `https://viacep.com.br/ws/${cep}/json/unicode/`

	let xmlHttp = new XMLHttpRequest()
	xmlHttp.open('GET', url)

	xmlHttp.onreadystatechange = () => {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			let dadosJSONText = xmlHttp.responseText
			let dadosJSONObj = JSON.parse(dadosJSONText)

			if (dadosJSONObj.erro) {
				exibirErro()
				return false
			}

			document.getElementById('endereco').value = dadosJSONObj.logradouro
			document.getElementById('bairro').value = dadosJSONObj.bairro
			document.getElementById('cidade').value = dadosJSONObj.localidade
			document.getElementById('uf').value = dadosJSONObj.uf
		}

		if (xmlHttp.readyState == 4 && xmlHttp.status == 0) {
			exibirErro()
		}
	}

	xmlHttp.send()
}

function exibirErro() {

	let divRow = document.createElement('div')
	divRow.className = 'row'
	divRow.id = 'msg-erro'
	document.getElementById('principal').appendChild(divRow)

	let divCol = document.createElement('div')
	divCol.className = 'col'
	divRow.appendChild(divCol)

	let divAlert = document.createElement('div')
	divAlert.className = 'alert alert-danger'
	divAlert.role = 'alert'
	divCol.appendChild(divAlert)

	let p = document.createElement('p')
	p.className = 'mb-0'
	p.innerHTML = 'CEP não encontrado!'
	divAlert.appendChild(p)

	document.getElementById('endereco').value = null
	document.getElementById('bairro').value = null
	document.getElementById('cidade').value = null
	document.getElementById('uf').value = null
}
