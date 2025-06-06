using api.Hub;
using api.Interfaces;
using api.Repositories;
using api.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

#region MongoDbSettings

///// get values from this file: appsettings.Development.json /////
// get section
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection(nameof(MongoDbSettings)));

// get values
builder.Services.AddSingleton<IMongoDbSettings>(serviceProvider =>
    serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);

// get connectionString to the db
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    MongoDbSettings uri = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;

    return new MongoClient(uri.ConnectionString);
});

#endregion MongoDbSettings

builder.Services.AddScoped<IChatRepository, ChatRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();

#region Cors: baraye ta'eede Angular HttpClient requests

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials() 
            .WithOrigins("http://localhost:4200"));
});

#endregion Cors

builder.Services.AddControllers();
builder.Services.AddSignalR();

var app = builder.Build();

app.UseRouting();

app.UseCors();

app.UseAuthorization();

app.MapHub<ChatHub>("/chatHub");

app.MapControllers();

app.Run();