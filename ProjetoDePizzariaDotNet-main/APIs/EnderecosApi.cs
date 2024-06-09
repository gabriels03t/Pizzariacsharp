using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public static class EnderecosApi
{
    public static void MapEnderecosApi(this WebApplication app)
    {
        var group = app.MapGroup("/enderecos");

        group.MapGet("/", async (BancoDeDados db) =>
            await db.Enderecos.ToListAsync()
        );

        group.MapPost("/", async (Endereco endereco, BancoDeDados db) =>
        {
            if (endereco.ClienteId > 0)
            {
                var cliente = await db.Clientes.FindAsync(endereco.ClienteId);
                if (cliente == null)
                {
                    return Results.BadRequest($"Nenhum cliente encontrado com ID {endereco.ClienteId}");
                }
                endereco.ClienteId = cliente.Id;
            }
            else
            {
                return Results.BadRequest("ClienteId é obrigatório");
            }

            db.Enderecos.Add(endereco);
            await db.SaveChangesAsync();
            return Results.Created($"/enderecos/{endereco.Id}", endereco);
        });

        group.MapPut("/{id}", async (int id, Endereco enderecoAlterado, BancoDeDados db) =>
        {
            var endereco = await db.Enderecos.FindAsync(id);
            if (endereco == null)
            {
                return Results.NotFound();
            }
            endereco.Rua = enderecoAlterado.Rua;
            endereco.Numero = enderecoAlterado.Numero;
            endereco.Bairro = enderecoAlterado.Bairro;
            endereco.Cidade = enderecoAlterado.Cidade;
            endereco.CEP = enderecoAlterado.CEP;

            if (enderecoAlterado.ClienteId > 0)
            {
                var cliente = await db.Clientes.FindAsync(enderecoAlterado.ClienteId);
                if (cliente == null)
                {
                    return Results.BadRequest($"Nenhum cliente encontrado com ID {enderecoAlterado.ClienteId}");
                }
                endereco.ClienteId = enderecoAlterado.ClienteId;
            }
            else
            {
                return Results.BadRequest("Cliente com Id é obrigatório");
            }

            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async (int id, BancoDeDados db) =>
        {
            var endereco = await db.Enderecos.FindAsync(id);
            if (endereco == null)
            {
                return Results.NotFound();
            }
            db.Enderecos.Remove(endereco);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}
