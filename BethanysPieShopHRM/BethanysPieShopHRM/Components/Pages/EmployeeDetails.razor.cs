using BethanysPieShopHRM.Services;
using Microsoft.AspNetCore.Components;
using BethanysPieShopHRM.Shared.Domain;

namespace BethanysPieShopHRM.Components.Pages;

public partial class EmployeeDetails
{
    [Parameter]
    public int EmployeeId { get; set; }
    
    public Employee Employee { get; set; } = new();

    protected override void OnInitialized()
    {
        Employee = MockDataService.Employees.Single(x=> x.EmployeeId == EmployeeId);
    }

    private void ChangeHolidayState()
    {
        Employee.IsOnHoliday = !Employee.IsOnHoliday;
    }
}