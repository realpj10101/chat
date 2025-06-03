using api.Models;

namespace api.Interfaces;

public interface IAccountRepository
{
    public Task<AppUser> RegisterAsync(AppUser user, CancellationToken cancellationToken);
}