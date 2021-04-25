class Generate{
    static text = document.querySelector('.text')
    static author = document.querySelector('.author')
    static quote;

    static display(){
        const idx = Math.floor(Math.random() * 1643);
        const displayData = Generate.quote[idx];

        Generate.text.innerText = `"${displayData.text}"`;
        Generate.author.innerText = `~ ${displayData.author}`;
    }

    static async getText() {
        let response = await fetch('https://type.fit/api/quotes');
        let responseData = await response.text();
        
        Generate.quote = JSON.parse(responseData);
        Generate.display();
    }
}

document.querySelector('.btn-lg').addEventListener('click', Generate.getText)
document.addEventListener('DOMContentLoaded', Generate.getText());