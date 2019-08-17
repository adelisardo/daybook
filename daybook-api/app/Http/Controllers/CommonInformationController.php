<?php

namespace App\Http\Controllers;

use App\Helper\Version;
use App\Http\Controllers\Base\Controller;
use App\Models\Memory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class CommonInformationController extends Controller
{
    public function read(Request $request)
    {
        $profile = User::read_profile(\Auth::user());
        $culture = json_decode('{}');
        $localizations = File::allFiles(base_path("app/Localization/"));
        foreach ($localizations as $value) {
            $culture = (object) array_merge(
                (array) $culture,
                (array) json_decode(file_get_contents($value->getPathname())));
        }
        return [
            'app' => Version::get_current(),
            'isAuthenticated' => ($profile != null),
            'profile' => $profile,
            'culture' => $culture,
        ];
    }
}
