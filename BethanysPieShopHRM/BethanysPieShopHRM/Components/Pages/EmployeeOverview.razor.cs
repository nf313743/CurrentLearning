using BethanysPieShopHRM.Services;
using BethanysPieShopHRM.Shared.Domain;

namespace BethanysPieShopHRM.Components.Pages;

public partial class EmployeeOverview
{
    public List<Employee>? Employees { get; set; }

    protected override  async Task OnInitializedAsync()
    {
        await Task.Delay(2000);
        Employees = MockDataService.Employees;
    }
}