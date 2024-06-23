public class Pedido
{
    public int Id { get; set; }
    public DateTime? Data { get; set; }
    public double? Total { get; set; }

    // Relacionamentos
    public int ClienteId { get; set; }
    public Cliente Cliente { get; set; }

    public int EnderecoId { get; set; }
    public Endereco EnderecoEntrega { get; set; }

    public List<ItemPedido> Itens { get; set; }
}
