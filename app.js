const loadData = function(url){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", e => resolve(xhr.responseText));
        xhr.addEventListener("error", e => reject(new Error(xhr.statusText)));
        xhr.open("GET", url, true);
        xhr.send();
    })
};

loadData(`https://bco-service-a-com.central-product.aws-eu-west-1.prod.williamhill.plc/v1/offers?langCode=en-gb&jurisdiction=com`)
    .then(result => main(JSON.parse(result)))
    .catch(error => console.error(error));


//creating a list of CTA Buttons
//each element in the list is a button bound with its promo
const ctaBtn = document.getElementsByClassName("ctaButton");

//modal window that appear after clicking CTA button
const modal = document.getElementById("myModal");

//two buttons at modal window
const acceptPromoBtn = document.getElementById("acceptPromo");
const declinePromoBtn = document.getElementById("declinePromo");

function disablePromo(promotions, i) {

    //change the style of promo which is disabled
    console.log(promotions[i].slug);
    document.getElementById(promotions[i].slug).style.background = "#A9A9A9";

    //		document.getElementById("promo_ctaLabel_" + i)
    //                .style.background = "#C0C0C0";

    document.getElementById("promo_ctaLabel_" + i).classList.add("disabledButton");

    //disable button of disabled promo
    ctaBtn[i].disabled = true;
}

function createHtmlElements(promotions) {
	let template = ``;

	for (let i = 0; i < promotions.length; i++) {

		//create HTML elements based on promotions[] 
		template += `
            <div class="promoContainer" id=${promotions[i].slug}>
                    <h1 class="promoClass" id="promo_title_${i}">"test"{{promo_title}}</h1>

                    <button class="ctaButton" id="promo_ctaLabel_${i}">{{ctaLabel}}</button>

                    <p class="promoTerms" id="promo_terms_${i}">{{promo_terms}}</p>
            </div>
            `;
	}

	return template;
}


function main(promotions){
	//create and assign HTML elements to already existing div
	document.getElementById("column").innerHTML = createHtmlElements(promotions);

	for (let i = 0; i < promotions.length; i++) {

		//set title, terms and ctaLabel for newly created HTML elements
		document.getElementById("promo_title_" + i).innerHTML = promotions[i].title;

		document.getElementById("promo_terms_" + i).innerHTML = promotions[i].shortDescription;

		document.getElementById("promo_ctaLabel_" + i).innerHTML = promotions[i].cta.text;

		ctaBtn[i].onclick = () => {
			console.log(i);

			//display window after clicking CTA button
			modal.style.display = "block";

			//set text in window to terms of that promo
			let modalText = document.createTextNode(promotions[i].shortDescription);

			document.getElementById("modal-text").appendChild(modalText);

			acceptPromoBtn.onclick = () => {

                disablePromo(promotions, i);
				//close the window
				modal.style.display = "none";

				//clearing text in window because of prev appending
				document.getElementById("modal-text").innerHTML = "";
			};

			declinePromoBtn.onclick = () => {
				modal.style.display = "none";

				//clearing text in window because of prev appending
				document.getElementById("modal-text").innerHTML = "";
			};
		};
	}
};
