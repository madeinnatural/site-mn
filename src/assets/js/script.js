$(function() {
  $('.btn_open_menu').on('click', function() {
      $('.centro_menu').toggleClass('d-none');
  })

  $('.section_categorias').find('.btn_next').on('click', function() {
      $('.cont_categorias').find('.categoria').last().prependTo('.cont_categorias');
  });
  $('.section_categorias').find('.btn_prev').on('click', function() {
      $('.cont_categorias').find('.categoria').first().appendTo('.cont_categorias');
  });

  $('.section_avaliacoes').find('.btn_next').on('click', function() {
      $('.cont_avaliacoes').find('.avaliacao').last().prependTo('.cont_avaliacoes');
  });
  $('.section_avaliacoes').find('.btn_prev').on('click', function() {
      $('.cont_avaliacoes').find('.avaliacao').first().appendTo('.cont_avaliacoes');
  });

  $('#btn_open_filtro').on('click', function() {
    $('#modal_filtro').modal('show');
    if($('#modal_filtro').find('.rs-container').length == 0) {
      var slider3 = new rSlider({
        target: '#slider3',
        values: {min: 0, max: 100},
        step: 10,
        range: true,
        set: [0, 40],
        scale: true,
        tooltip: true,
        labels: false,
        onChange: function (vals) {
            console.log(vals);
        }
      });
    }
  });

  $('.btn_open_menu_fechar_pedido').on('click', function() {
    $('#menu_fechar_pedido').toggle();
  });
})