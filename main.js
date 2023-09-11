$(document).ready(function () {
    $('#fetchCardButton').click(function () {
        performSearch();
    });

    $('#cardNameInput').keydown(function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }
    });

    function performSearch() {
        const cardName = $('#cardNameInput').val();
        const apiUrl = `https://api.hearthstonejson.com/v1/latest/enUS/cards.json`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const matchingCard = data.find(card => card.name.toLowerCase() === cardName.toLowerCase());

                if (matchingCard) {
                    const cardImageUrl = `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${matchingCard.id}.png`;
                    $('#cardImage').attr('src', cardImageUrl);
                    $('#cardDescription').html(matchingCard.text);
                } else {
                    $('#cardImage').attr('src', '');
                    $('#cardDescription').text('Card not found.');
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
            }
        });
    }
});
