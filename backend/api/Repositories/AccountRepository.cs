using api.Interfaces;
using api.Models;
using api.Settings;
using MongoDB.Driver;

namespace api.Repositories;

public class AccountRepository : IAccountRepository
{
    private readonly IMongoCollection<AppUser> _collection;

    public AccountRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");
    }
    
    public async Task<AppUser> RegisterAsync(AppUser user, CancellationToken cancellationToken)
    {
        await _collection.InsertOneAsync(user, null, cancellationToken);

        return user;
    }
}