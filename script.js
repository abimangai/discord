//menubar open and close//
const menuopen = document.getElementById("menuopen");
const menuclose = document.getElementById("closebar");
function closemenu() {
    menuclose.style.display = "none";
}
function openmenu() {
    menuclose.style.display = "block";
}

/*fetching json data*/
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productsData = await response.json();

        const containerElement = document.getElementById('container');
        const inputBox = document.getElementById('input-box');
        const categoryButtons = document.querySelectorAll('.category');

        const displayProducts = (containers) => {
            containerElement.innerHTML = '';

            if (containers.length === 0) {
                containerElement.innerHTML = '<p>No matching products found.</p>';
            } else {
                containers.forEach(container => {
                    const containerDiv = document.createElement('div');
                    containerDiv.classList.add('container');
                    containerDiv.dataset.category = container.category.join(' ');
                    containerDiv.innerHTML = `
                        <div class="left-division">
                            <img src="${container.imageSrc}" alt="${container.altText}">
                        </div>
                        <div class="right-division">
                            <div class="heading-content">
                                <img class="logo" src="${container.logoSrc}" alt="${container.logoAlt}">
                                <h1 class="heading">${container.heading}</h1>
                            </div> 
                            <div class="body">
                                <p class="body-paragraph">${container.body.paragraph}</p>
                                <h5 class="sub-heading">${container.body.subHeading}</h5>
                            </div>
                            <div class="down">
                                <img class="down-img" src="${container.downSrc}" alt="${container.downAlt}">
                                <p>${container.divText}</p>
                            </div>
                        </div>
                    `;
                    containerElement.appendChild(containerDiv);
                });
            }
            updateResultsCount(containers.length);

        };

        /*filter and finding length*/
        const updateCategoryCounts = () => {
            categoryButtons.forEach(button => {
                const category = button.dataset.category;
                const count = category === 'All'
                    ? productsData.containers.length
                    : productsData.containers.filter(container => container.category.includes(category)).length;
                button.querySelector('.count').textContent = count;
            });
        };

        const updateResultsCount = (count) => {
            document.getElementById('results-count').textContent = count;
        };

        const updateSelectedCategory = (category) => {
            document.getElementById('selectedCategory').textContent = category;
        };

        const filterItems = () => {
            const searchText = inputBox.value.toLowerCase().trim();
            const selectedButton = document.querySelector('.category.selected');
            const selectedCategory = selectedButton ? selectedButton.dataset.category : 'All';

            let filteredData = productsData.containers;
            if (selectedCategory !== 'All') {
                updateSelectedCategory(selectedCategory)
                filteredData = filteredData.filter(container => container.category.includes(selectedCategory));
            } else {
                selectedCategory === 'All';
                updateSelectedCategory(selectedCategory)
            }
            filteredData = filteredData.filter(container =>
                container.heading.toLowerCase().includes(searchText) ||
                container.category.some(cat => cat.toLowerCase().includes(searchText))
            );
            displayProducts(filteredData);
        };

        // Initial render
        displayProducts(productsData.containers);
        updateCategoryCounts();

        // Event listeners
        inputBox.addEventListener('input', filterItems);

        // button function
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Toggle selection
                categoryButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                filterItems();
            });
        });

    } catch (error) {
        console.error('Error:', error);
    }
});

//left division category */
document.getElementById('categoryButton').addEventListener('click', function () {
    const categoryList = document.getElementById('categoryList');
    categoryList.style.display = 'flex';
    const screen=document.querySelector(".screen");
    screen.style.display='block';
});

document.querySelectorAll('.category').forEach(ul => {
    ul.addEventListener('click', function () {
        const categoryList = document.getElementById('categoryList');
        const screen=document.querySelector(".screen");
        screen.style.display='none';
        if (window.innerWidth <= 1024) {
            categoryList.style.display = 'none';
        }
    }
    )
});

window.addEventListener('resize', function () {
    const categoryList = document.getElementById('categoryList');
    if (window.innerWidth > 1024) {
        categoryList.style.display = 'flex';
    } else {
        categoryList.style.display = 'none';
    }
});
