using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public static class ClientesApi
{
    public static void MapClientesApi(this WebApplication app)
    {
        var group = app.MapGroup("/clientes");

        group.MapGet("/", async ([FromServices] BancoDeDados db) =>
        {
            // Incluir os endereços ao consultar os clientes
            return await db.Clientes.Include(c => c.Enderecos).ToListAsync();
        });

        group.MapPost("/", async (Cliente cliente, [FromServices] BancoDeDados db) =>
        {
            Console.WriteLine($"Cliente: {cliente}");

            cliente.Enderecos = await TratarEnderecos(cliente, db);
            
            db.Clientes.Add(cliente);
            await db.SaveChangesAsync();

            return Results.Created($"/clientes/{cliente.Id}", cliente);
        });

        group.MapPut("/{id}", async (int id, Cliente clienteAlterado, [FromServices] BancoDeDados db) =>
        {
            var cliente = await db.Clientes.FindAsync(id);
            if (cliente is null)
            {
                return Results.NotFound();
            }
            cliente.Nome = clienteAlterado.Nome;
            cliente.Telefone = clienteAlterado.Telefone;
            cliente.Email = clienteAlterado.Email;
            cliente.CPF = clienteAlterado.CPF;

            cliente.Enderecos = await TratarEnderecos(cliente, db);

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapDelete("/{clienteId:int}", async (int clienteId, [FromServices] BancoDeDados db) =>
        {
            var cliente = await db.Clientes.FindAsync(clienteId);
            if (cliente == null)
            {
                return Results.NotFound($"Cliente com ID {clienteId} não encontrado.");
            }
            db.Clientes.Remove(cliente);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }

    private static async Task<List<Endereco>> TratarEnderecos(Cliente cliente, BancoDeDados db)
    {
        List<Endereco> enderecos = new();
        if (cliente != null && cliente.Enderecos != null && cliente.Enderecos.Count > 0)
        {
            foreach (var endereco in cliente.Enderecos)
            {
                Console.WriteLine($"Endereço: {endereco}");
                if (endereco.Id > 0)
                {
                    var eExistente = await db.Enderecos.FindAsync(endereco.Id);
                    if (eExistente != null)
                    {
                        enderecos.Add(eExistente);
                    }
                }
                else
                {
                    enderecos.Add(endereco);
                }
            }
        }
        return enderecos;
    }
}
