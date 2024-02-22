const url_img  = "https://cs210032002bbb3c8c4.blob.core.windows.net/analiseimagenssenai/shrek.jfif";
const endpoint = "https://ia-azure-senai.cognitiveservices.azure.com/";
const key = "ba1ff063f9764f82b0e1d5e314043e13";

//vars referentes ao local onde a imagem esta armazenada;
//e aos dados do Computer Vision (Key & Endpoint).

fetch(`${endpoint}/vision/v3.1/analyze?visualFeatures=Tags&language=pt`, {  //url + comando para analisar a imagem enviada
    method: 'POST', // formatando os dados do POST como JSON 
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': key  //enviando a "chave de acesso" ao Computer Vision no header
    },
    body: JSON.stringify({ url: url_img }) //linkando a img referente
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao fazer a solicitação: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log('Tags:', data.tags);
    const tagsElement = document.getElementById('tags');
    tagsElement.innerHTML = data.tags.map(tag => `<li>${tag.name} (${tag.confidence.toFixed(2)});</li>`).join('');
  })
  .catch(error => {
   
    console.error('Erro:', error);
  });