public class Pedido
{
    public int Id { get; set; }
    public DateTime? Data { get; set; }
    public double? Total { get; set; }

    public Cliente? Cliente { get; set; }

    public List<ItemPedido>? Itens { get; set; }
}
