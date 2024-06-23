using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

public static class PedidoApi
{
    public static void MapPedidoApi(this WebApplication app)
    {
        var group = app.MapGroup("/pedidos");

        group.MapGet("/", async (BancoDeDados db) =>
        {
            return await db.Pedidos
                .Include(p => p.Cliente)
                .Include(p => p.EnderecoEntrega)
                .Include(p => p.Itens)
                    .ThenInclude(ip => ip.Pizza)
                .ToListAsync();
        });

        group.MapGet("/{id}", async (int id, BancoDeDados db) =>
        {
            var pedido = await db.Pedidos
                .Include(p => p.Cliente)
                .Include(p => p.EnderecoEntrega)
                .Include(p => p.Itens)
                    .ThenInclude(ip => ip.Pizza)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pedido == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(pedido);
        });

        group.MapPost("/", async (Pedido pedido, BancoDeDados db) =>
        {
            // Certifique-se de que o cliente, endereço e itens do pedido estão corretamente associados
            if (pedido.ClienteId == 0)
            {
                return Results.BadRequest("ClienteId não pode ser zero.");
            }

            if (pedido.EnderecoId == 0)
            {
                return Results.BadRequest("EnderecoId não pode ser zero.");
            }

            var cliente = await db.Clientes.FindAsync(pedido.ClienteId);
            if (cliente == null)
            {
                return Results.BadRequest("Cliente não encontrado.");
            }

            var endereco = await db.Enderecos.FindAsync(pedido.EnderecoId);
            if (endereco == null)
            {
                return Results.BadRequest("Endereço não encontrado.");
            }

            pedido.Cliente = cliente;
            pedido.EnderecoEntrega = endereco;
            pedido.Data = DateTime.Now;
            pedido.Total = pedido.Itens.Sum(ip => ip.Valor * ip.Quantidade);

            db.Pedidos.Add(pedido);
            await db.SaveChangesAsync();

            return Results.Created($"/pedidos/{pedido.Id}", pedido);
        });

        group.MapPut("/{id}", async (int id, Pedido updatedPedido, BancoDeDados db) =>
        {
            var pedido = await db.Pedidos
                .Include(p => p.Cliente)
                .Include(p => p.EnderecoEntrega)
                .Include(p => p.Itens)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pedido == null)
            {
                return Results.NotFound();
            }

            pedido.ClienteId = updatedPedido.ClienteId;
            pedido.EnderecoId = updatedPedido.EnderecoId;
            pedido.Itens = updatedPedido.Itens;
            pedido.Total = updatedPedido.Total;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapDelete("/{id}", async (int id, BancoDeDados db) =>
        {
            var pedido = await db.Pedidos.FindAsync(id);
            if (pedido == null)
            {
                return Results.NotFound();
            }

            db.Pedidos.Remove(pedido);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}
