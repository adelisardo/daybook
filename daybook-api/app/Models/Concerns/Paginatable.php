<?php
namespace App\Models\Concerns;

use Illuminate\Http\Request;

trait Paginatable
{
    private $pageSizeLimit = 100;
    public function getPerPage()
    {
        $pageSize = $this->request('page_size', $this->perPage);
        return min($pageSize, $this->pageSizeLimit);
    }

    public function request($key = null, $default = null)
    {
        if (is_null($key)) {
            return app('request');
        }
        if (is_array($key)) {
            return app('request')->only($key);
        }
        return app('request')->input($key, $default);
    }
}
